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

import wordData from '@/data/topikIWords.json';

// Папки категорий слов. Данные TOPIK I (1671 слово) лежат в data/topikIWords.json.
export const WORD_CATEGORIES: WordCategory[] = wordData.categories;

export const CARDS_PER_SESSION = 20;

export function getWordCategory(id: string): WordCategory | undefined {
  return WORD_CATEGORIES.find((category) => category.id === id);
}

export function getWordCard(categoryId: string, wordId: string): WordCard | undefined {
  return getWordCategory(categoryId)?.words.find((word) => word.id === wordId);
}

export function countSessions(category: WordCategory): number {
  return Math.ceil(category.words.length / CARDS_PER_SESSION);
}

export function getSessionWords(category: WordCategory, session: number): WordCard[] {
  const start = (session - 1) * CARDS_PER_SESSION;
  return category.words.slice(start, start + CARDS_PER_SESSION);
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
