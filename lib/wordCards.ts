import wordData from '@/data/topikIWords.json';

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

// Прогресс хранится в браузере: слова «знаю» больше не показываются,
// слова «не знаю» попадают в следующие тесты.
interface CategoryProgress {
  known: string[];
  unknown: string[];
}

const PROGRESS_KEY = 'wordCards.progress';

function readProgress(): Record<string, CategoryProgress> {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function writeProgress(progress: Record<string, CategoryProgress>) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Хранилище недоступно: прогресс не сохранится, тест продолжит работать
  }
}

function getCategoryProgress(categoryId: string): CategoryProgress {
  const entry = readProgress()[categoryId];
  return { known: entry?.known ?? [], unknown: entry?.unknown ?? [] };
}

export function markWord(categoryId: string, wordId: string, known: boolean) {
  const progress = readProgress();
  const current = progress[categoryId] ?? { known: [], unknown: [] };
  const without = (list: string[]) => list.filter((id) => id !== wordId);
  progress[categoryId] = known
    ? { known: [...without(current.known), wordId], unknown: without(current.unknown) }
    : { known: without(current.known), unknown: [...without(current.unknown), wordId] };
  writeProgress(progress);
}

// Следующий тест: сначала слова «не знаю» из прошлых тестов, затем новые слова.
// Слова «знаю» не попадают в тест.
export function buildTest(category: WordCategory): WordCard[] {
  const { known, unknown } = getCategoryProgress(category.id);
  const byId = new Map(category.words.map((word) => [word.id, word]));
  const pending = unknown.map((id) => byId.get(id)).filter((word): word is WordCard => Boolean(word));
  const seen = new Set([...known, ...unknown]);
  const fresh = category.words.filter((word) => !seen.has(word.id));
  return [...pending, ...fresh].slice(0, CARDS_PER_SESSION);
}

export function countLeft(category: WordCategory): number {
  const { known } = getCategoryProgress(category.id);
  return category.words.length - known.length;
}
