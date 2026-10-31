import wordData from '@/data/topikIWords.json';
import { supabase } from '@/lib/supabase';
import { getUserId } from '@/lib/account';

export interface WordCard {
  id: string;
  word: string;
  translation: string;
}

export interface WordCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  words: WordCard[];
}

// Папки категорий слов. Данные TOPIK I (1671 слово) лежат в data/topikIWords.json.
export const WORD_CATEGORIES: WordCategory[] = wordData.categories;

export const CARDS_PER_SESSION = 20;

export function getWordCategory(id: string): WordCategory | undefined {
  return WORD_CATEGORIES.find((category) => category.id === id);
}

export function getWordCard(categoryId: string, wordId: string): WordCard | undefined {
  return getWordCategory(categoryId)?.words.find((word) => word.id === wordId);
}

// Ключ для записи слова в таблицу ошибок: cards-{категория}-{слово}
export function cardKey(categoryId: string, wordId: string) {
  return `cards-${categoryId}-${wordId}`;
}

export function parseCardKey(key: string): { categoryId: string; wordId: string } | null {
  const match = key.match(/^cards-(.+)-([^-]+)$/);
  if (!match) return null;
  return { categoryId: match[1], wordId: match[2] };
}

interface CategoryProgress {
  known: Set<string>;
  unknown: string[];
}

// Прогресс хранится в таблице word_card_progress (см. supabase/schema.sql)
async function getCategoryProgress(categoryId: string): Promise<CategoryProgress> {
  const userId = await getUserId();
  if (!userId) return { known: new Set(), unknown: [] };
  const { data } = await supabase
    .from('word_card_progress')
    .select('word_id, status')
    .eq('user_id', userId)
    .eq('category_id', categoryId)
    .order('updated_at', { ascending: true });
  const rows = (data as { word_id: string; status: 'known' | 'unknown' }[]) ?? [];
  return {
    known: new Set(rows.filter((row) => row.status === 'known').map((row) => row.word_id)),
    unknown: rows.filter((row) => row.status === 'unknown').map((row) => row.word_id),
  };
}

export async function markWord(categoryId: string, wordId: string, known: boolean) {
  const userId = await getUserId();
  if (!userId) return;
  await supabase.from('word_card_progress').upsert({
    user_id: userId,
    category_id: categoryId,
    word_id: wordId,
    status: known ? 'known' : 'unknown',
    updated_at: new Date().toISOString(),
  });
}

// Следующий тест: сначала слова «не знаю» из прошлых тестов, затем новые слова.
// Слова «знаю» не попадают в тест.
export async function loadTest(category: WordCategory): Promise<{ cards: WordCard[]; left: number }> {
  const { known, unknown } = await getCategoryProgress(category.id);
  const byId = new Map(category.words.map((word) => [word.id, word]));
  const pending = unknown.map((id) => byId.get(id)).filter((word): word is WordCard => Boolean(word));
  const seen = new Set([...known, ...unknown]);
  const fresh = category.words.filter((word) => !seen.has(word.id));
  return {
    cards: [...pending, ...fresh].slice(0, CARDS_PER_SESSION),
    left: category.words.length - known.size,
  };
}

export async function countLeft(category: WordCategory): Promise<number> {
  const { known } = await getCategoryProgress(category.id);
  return category.words.length - known.size;
}
