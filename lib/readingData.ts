export interface GrammarExample {
  ko: string;
  ru: string;
}

export interface GrammarPoint {
  pattern: string;
  meaning: string;
  examples: GrammarExample[];
}

export interface WordEntry {
  word: string;
  translation: string;
}

export interface ReadingQuestion {
  id: string;
  number: number;
  skill: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  grammar: GrammarPoint[];
  words: WordEntry[];
}

export interface ReadingLesson {
  number: number;
  questionSet: string;
  questions: ReadingQuestion[];
}

export interface ReadingData {
  lessons: ReadingLesson[];
  readingRules: Record<string, string>;
}
