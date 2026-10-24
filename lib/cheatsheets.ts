export interface CheatSheet {
  id: string;
  title: string;
  subtitle: string;
  src: string;
}

export interface CheatSheetLevel {
  number: number;
  sheets: CheatSheet[];
}

export const CHEAT_SHEET_LEVELS: CheatSheetLevel[] = [
  {
    number: 1,
    sheets: [
      { id: 'antonyms', title: 'Антонимы', subtitle: 'противоположные прилагательные', src: '/cheatsheets/level-1/antonyms.webp' },
      { id: 'conjunctions', title: 'Союзные наречия', subtitle: 'как связать два предложения', src: '/cheatsheets/level-1/conjunctions.png' },
      { id: 'counters', title: 'Счётные слова', subtitle: 'единицы с корейскими числами', src: '/cheatsheets/level-1/counters.webp' },
      { id: 'degree-adverbs', title: 'Наречия степени', subtitle: 'насколько сильно / насколько сильно нет', src: '/cheatsheets/level-1/degree-adverbs.webp' },
      { id: 'family-terms', title: 'Семейные термины', subtitle: 'семейные обращения', src: '/cheatsheets/level-1/family-terms.webp' },
      { id: 'homonyms-1', title: 'Омонимы', subtitle: 'одно слово — разные значения', src: '/cheatsheets/level-1/homonyms-1.webp' },
      { id: 'homonyms-2', title: 'Омонимы II', subtitle: 'одно слово — разные значения', src: '/cheatsheets/level-1/homonyms-2.webp' },
      { id: 'homonyms-3', title: 'Омонимы III', subtitle: 'слова, местоимения и частицы', src: '/cheatsheets/level-1/homonyms-3.webp' },
    ],
  },
];

export function getCheatSheetLevel(number: number): CheatSheetLevel | undefined {
  return CHEAT_SHEET_LEVELS.find((level) => level.number === number);
}
