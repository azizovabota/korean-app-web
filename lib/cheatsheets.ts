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
      { id: 'frequency-adverbs', title: 'Наречия частоты', subtitle: 'как часто это происходит', src: '/cheatsheets/level-1/frequency-adverbs.webp' },
      { id: 'manner-adverbs', title: 'Наречия образа действия', subtitle: 'как именно что-то делают', src: '/cheatsheets/level-1/manner-adverbs.webp' },
      { id: 'months', title: 'Месяцы', subtitle: 'число + 월 (китайско-корейские)', src: '/cheatsheets/level-1/months.webp' },
      { id: 'two-number-systems', title: 'Два счёта', subtitle: 'корейские числа против китайско-корейских', src: '/cheatsheets/level-1/two-number-systems.webp' },
      { id: 'particles-e', title: '에 · 에서 · 로', subtitle: 'место, действие и направление', src: '/cheatsheets/level-1/particles-e-eseo-ro.webp' },
      { id: 'particles-eun-neun', title: '은/는 против 이/가', subtitle: 'тема против подлежащего', src: '/cheatsheets/level-1/particles-eun-neun-i-ga.png' },
      { id: 'place-adverbs', title: 'Наречия места', subtitle: 'где это находится', src: '/cheatsheets/level-1/place-adverbs.webp' },
      { id: 'politeness-levels', title: 'Уровни вежливости', subtitle: '존댓말 на примере 가다 (идти)', src: '/cheatsheets/level-1/politeness-levels.png' },
      { id: 'quantity-adverbs', title: 'Наречия количества', subtitle: 'сколько этого есть', src: '/cheatsheets/level-1/quantity-adverbs.webp' },
      { id: 'question-words', title: 'Вопросительные слова', subtitle: '의문사', src: '/cheatsheets/level-1/question-words.webp' },
      { id: 'time-planning', title: 'Планирование времени', subtitle: 'сегодня, на следующей неделе и т.д.', src: '/cheatsheets/level-1/time-planning.webp' },
      { id: 'synonyms-2', title: 'Синонимы II', subtitle: 'ещё слова с близким значением', src: '/cheatsheets/level-1/synonyms-2.webp' },
      { id: 'synonyms-3', title: 'Синонимы III', subtitle: 'вежливые формы слов + ещё синонимы', src: '/cheatsheets/level-1/synonyms-3.webp' },
      { id: 'time-adverbs', title: 'Наречия времени', subtitle: 'когда это происходит', src: '/cheatsheets/level-1/time-adverbs.webp' },
      { id: 'weather', title: 'Погода', subtitle: '날씨', src: '/cheatsheets/level-1/weather.webp' },
      { id: 'weekdays', title: 'Дни недели', subtitle: '요일', src: '/cheatsheets/level-1/weekdays.webp' },
    ],
  },
];

export function getCheatSheetLevel(number: number): CheatSheetLevel | undefined {
  return CHEAT_SHEET_LEVELS.find((level) => level.number === number);
}
