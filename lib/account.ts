import { supabase } from '@/lib/supabase';

export type Goal = 'topik_1_2' | 'topik_3_4' | 'topik_5_6';

export const goalLabels: Record<Goal, string> = {
  topik_1_2: 'TOPIK 1–2',
  topik_3_4: 'TOPIK 3–4',
  topik_5_6: 'TOPIK 5–6',
};

export interface LessonProgressRow {
  lesson_key: string;
  score: number;
  total: number;
  completed_at: string;
}

export interface MistakeRow {
  question_key: string;
  source: string;
  prompt: string;
  user_answer: string;
  correct_answer: string;
  created_at: string;
  due_at: string;
  interval_days: number;
  reps: number;
}

const REVIEW_LADDER_DAYS = [1, 3, 7, 14, 30];

function daysFromNow(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

export async function getUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.user.id ?? null;
}

export async function getProfile(): Promise<{ name: string; goal: Goal | null } | null> {
  const userId = await getUserId();
  if (!userId) return null;
  const { data } = await supabase.from('profiles').select('name, goal').eq('id', userId).maybeSingle();
  return data ? { name: data.name, goal: (data.goal as Goal | null) ?? null } : null;
}

export async function saveGoal(goal: Goal) {
  const userId = await getUserId();
  if (!userId) throw new Error('Нужно войти в аккаунт');
  const { error } = await supabase.from('profiles').upsert({ id: userId, goal });
  if (error) throw error;
}

export async function getLessonProgress(): Promise<LessonProgressRow[]> {
  const userId = await getUserId();
  if (!userId) return [];
  const { data } = await supabase
    .from('lesson_progress')
    .select('lesson_key, score, total, completed_at')
    .eq('user_id', userId)
    .order('completed_at', { ascending: false });
  return (data as LessonProgressRow[]) ?? [];
}

export async function recordLessonCompleted(lessonKey: string, score: number, total: number) {
  const userId = await getUserId();
  if (!userId) return;
  await supabase.from('lesson_progress').upsert({
    user_id: userId,
    lesson_key: lessonKey,
    score,
    total,
    completed_at: new Date().toISOString(),
  });
}

const MISTAKE_FIELDS = 'question_key, source, prompt, user_answer, correct_answer, created_at, due_at, interval_days, reps';

export async function getMistakes(): Promise<MistakeRow[]> {
  const userId = await getUserId();
  if (!userId) return [];
  const { data } = await supabase
    .from('mistakes')
    .select(MISTAKE_FIELDS)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return (data as MistakeRow[]) ?? [];
}

export async function getDueMistakes(): Promise<MistakeRow[]> {
  const userId = await getUserId();
  if (!userId) return [];
  const { data } = await supabase
    .from('mistakes')
    .select(MISTAKE_FIELDS)
    .eq('user_id', userId)
    .lte('due_at', new Date().toISOString())
    .order('due_at', { ascending: true });
  return (data as MistakeRow[]) ?? [];
}

export async function recordMistake(row: Pick<MistakeRow, 'question_key' | 'source' | 'prompt' | 'user_answer' | 'correct_answer'>) {
  const userId = await getUserId();
  if (!userId) return;
  await supabase.from('mistakes').upsert({
    user_id: userId,
    ...row,
    created_at: new Date().toISOString(),
    due_at: daysFromNow(REVIEW_LADDER_DAYS[0]),
    interval_days: REVIEW_LADDER_DAYS[0],
    reps: 0,
  });
}

export async function recordReviewResult(questionKey: string, correct: boolean) {
  const userId = await getUserId();
  if (!userId) return;
  const { data } = await supabase
    .from('mistakes')
    .select('reps')
    .eq('user_id', userId)
    .eq('question_key', questionKey)
    .maybeSingle();
  if (!data) return;
  if (!correct) {
    await supabase.from('mistakes').update({ reps: 0, interval_days: REVIEW_LADDER_DAYS[0], due_at: daysFromNow(REVIEW_LADDER_DAYS[0]) })
      .eq('user_id', userId).eq('question_key', questionKey);
    return;
  }
  const reps = data.reps + 1;
  if (reps >= REVIEW_LADDER_DAYS.length) {
    await supabase.from('mistakes').delete().eq('user_id', userId).eq('question_key', questionKey);
    return;
  }
  const interval = REVIEW_LADDER_DAYS[reps];
  await supabase.from('mistakes').update({ reps, interval_days: interval, due_at: daysFromNow(interval) })
    .eq('user_id', userId).eq('question_key', questionKey);
}
