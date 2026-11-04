import indexData from '@/data/grammar/index.json';

export interface GrammarTopicMeta {
  id: string;
  korean: string;
  russian: string;
  level_ru: string;
  exercise_count: number;
}

export interface GrammarGroup {
  id: string;
  title: string;
  topics: GrammarTopicMeta[];
}

export interface GrammarExercise {
  exercise_number: number;
  prompt_korean: string;
  prompt_russian: string;
  sentence_before: string;
  sentence_after: string;
  correct_answer: string;
  translation_ru: string;
}

export interface GrammarTopic extends GrammarTopicMeta {
  exercises: GrammarExercise[];
}

// Список тем хранится отдельно и весит немного; упражнения подгружаются по теме
export const GRAMMAR_GROUPS: GrammarGroup[] = indexData.groups;

export function getGrammarTopicMeta(id: string) {
  for (const group of GRAMMAR_GROUPS) {
    const topic = group.topics.find((item) => item.id === id);
    if (topic) return topic;
  }
  return undefined;
}

// Тема с упражнениями: грузим только файл своей группы
export async function loadGrammarTopic(id: string): Promise<GrammarTopic | undefined> {
  const group = GRAMMAR_GROUPS.find((item) => item.topics.some((topic) => topic.id === id));
  if (!group) return undefined;
  const file = (await import(`@/data/grammar/${group.id}.json`)) as { default: { topics: GrammarTopic[] } };
  return file.default.topics.find((topic) => topic.id === id);
}

// Сравниваем без лишних пробелов и знаков в конце: «가지 마세요.» и «가지 마세요» считаем одинаковыми
export function isExerciseCorrect(answer: string, correct: string) {
  const normalize = (text: string) => text.replace(/\s+/g, ' ').trim().replace(/[.!?]+$/, '');
  return normalize(answer) === normalize(correct);
}
