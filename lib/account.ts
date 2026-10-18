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

export async function getMistakes(): Promise<MistakeRow[]> {
  const userId = await getUserId();
  if (!userId) return [];
  const { data } = await supabase
    .from('mistakes')
    .select('question_key, source, prompt, user_answer, correct_answer, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  return (data as MistakeRow[]) ?? [];
}

export async function recordMistake(row: Omit<MistakeRow, 'created_at'>) {
  const userId = await getUserId();
  if (!userId) return;
  await supabase.from('mistakes').upsert({ user_id: userId, ...row, created_at: new Date().toISOString() });
}

export async function clearMistake(questionKey: string) {
  const userId = await getUserId();
  if (!userId) return;
  await supabase.from('mistakes').delete().eq('user_id', userId).eq('question_key', questionKey);
}
