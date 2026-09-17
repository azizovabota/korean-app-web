export interface GrammarItem {
  id: string;
  korean: string;
  english: string;
  example: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  korean: string;
  example: string;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  level: string;
  grammar: GrammarItem[];
  vocabulary: VocabularyItem[];
  test: TestQuestion[];
}

export const readingLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Lesson 1: 기본 문법',
    description: 'Basic Korean Grammar - Subject and Object Particles',
    level: 'Level 1',
    grammar: [
      {
        id: 'g1-1',
        korean: '~은/는 (Subject Particle)',
        english: 'Marks the subject of a sentence',
        example: '나는 학생입니다. (I am a student.)',
      },
      {
        id: 'g1-2',
        korean: '~을/를 (Object Particle)',
        english: 'Marks the direct object',
        example: '나는 책을 읽습니다. (I read a book.)',
      },
      {
        id: 'g1-3',
        korean: '~이/가 (Subject Particle - Emphasis)',
        english: 'Emphasizes the subject',
        example: '누가 왔어요? - 친구가 왔어요. (Who came? - My friend came.)',
      },
      {
        id: 'g1-4',
        korean: '~에 (Location/Time/Direction)',
        english: 'Indicates location, time, or direction',
        example: '도서관에 가요. (I go to the library.)',
      },
      {
        id: 'g1-5',
        korean: '~에서 (Location of Action/From)',
        english: 'Shows where an action takes place or from where',
        example: '학교에서 공부해요. (I study at school.)',
      },
    ],
    vocabulary: [
      {
        id: 'v1-1',
        word: '학생',
        korean: 'Student',
        example: '나는 학생이에요.',
      },
      {
        id: 'v1-2',
        word: '책',
        korean: 'Book',
        example: '좋은 책을 읽어요.',
      },
      {
        id: 'v1-3',
        word: '도서관',
        korean: 'Library',
        example: '도서관에 가요.',
      },
      {
        id: 'v1-4',
        word: '친구',
        korean: 'Friend',
        example: '친구와 놀아요.',
      },
      {
        id: 'v1-5',
        word: '학교',
        korean: 'School',
        example: '학교에 가요.',
      },
    ],
    test: [
      {
        id: 't1-1',
        question: '나는 ___ 학생입니다. 빈칸에 맞는 조사를 넣으세요.',
        options: ['을', '이', '를', '에'],
        correctAnswer: 1,
        explanation: '이는 받침 있는 명사 뒤에 오는 주격 조사입니다.',
      },
      {
        id: 't1-2',
        question: '친구가 나에게 ___ 줬어요. (책)',
        options: ['책에', '책을', '책이', '책에서'],
        correctAnswer: 1,
        explanation: '직접 목적어는 ~을/를 조사를 사용합니다.',
      },
      {
        id: 't1-3',
        question: '나는 도서관___ 공부해요.',
        options: ['에', '에서', '을', '이'],
        correctAnswer: 1,
        explanation: '행동이 일어나는 장소는 ~에서를 사용합니다.',
      },
      {
        id: 't1-4',
        question: '___ 가요? - 한국에 가요.',
        options: ['어디에', '어디를', '언제', '누가'],
        correctAnswer: 0,
        explanation: '장소를 묻는 질문입니다.',
      },
      {
        id: 't1-5',
        question: '이 책___ 아주 좋아요.',
        options: ['은', '이', '을', '에'],
        correctAnswer: 0,
        explanation: '받침 없는 명사 뒤의 주격 조사는 ~은입니다.',
      },
    ],
  },
  {
    id: 'lesson-2',
    title: 'Lesson 2: 시간 표현',
    description: 'Time Expressions and Daily Activities',
    level: 'Level 1',
    grammar: [
      {
        id: 'g2-1',
        korean: '~ㅂ니다/습니다 (Polite Past)',
        english: 'Polite formal past tense',
        example: '영화를 봤습니다. (I watched a movie.)',
      },
      {
        id: 'g2-2',
        korean: '~아/어요 (Casual Present)',
        english: 'Casual present tense',
        example: '지금 공부해요. (I am studying now.)',
      },
      {
        id: 'g2-3',
        korean: '~고 있어요 (Progressive)',
        english: 'Ongoing action',
        example: '밥을 먹고 있어요. (I am eating rice.)',
      },
      {
        id: 'g2-4',
        korean: '~면 (If/When)',
        english: 'Conditional clause',
        example: '시간이 있으면 와요. (If I have time, I will come.)',
      },
      {
        id: 'g2-5',
        korean: '~려고 (Intent)',
        english: 'Expression of intention',
        example: '밥을 먹으려고 해요. (I intend to eat.)',
      },
    ],
    vocabulary: [
      {
        id: 'v2-1',
        word: '시간',
        korean: 'Time/Hour',
        example: '1시간 공부했어요.',
      },
      {
        id: 'v2-2',
        word: '아침',
        korean: 'Morning',
        example: '아침에 일어나요.',
      },
      {
        id: 'v2-3',
        word: '저녁',
        korean: 'Evening',
        example: '저녁에 뭐 해요?',
      },
      {
        id: 'v2-4',
        word: '밥',
        korean: 'Meal/Rice',
        example: '밥을 먹어요.',
      },
      {
        id: 'v2-5',
        word: '일어나다',
        korean: 'To wake up',
        example: '아침 7시에 일어나요.',
      },
    ],
    test: [
      {
        id: 't2-1',
        question: '어제 영화를 ___.',
        options: ['봤어요', '봐요', '봐했어요', '본해요'],
        correctAnswer: 0,
        explanation: '과거시제는 ~았/었어요를 사용합니다.',
      },
      {
        id: 't2-2',
        question: '지금 뭐 ___?',
        options: ['해요', '했어요', '하고 있어요', '하려고'],
        correctAnswer: 2,
        explanation: '지금 진행 중인 행동은 ~고 있어요를 사용합니다.',
      },
      {
        id: 't2-3',
        question: '시간이 ___ 온다고 했어요.',
        options: ['있으면', '있어요', '있는', '있었으면'],
        correctAnswer: 0,
        explanation: '조건을 나타낼 때는 ~으면을 사용합니다.',
      },
      {
        id: 't2-4',
        question: '나는 의사가 ___ 해요.',
        options: ['되어', '되려고', '되면', '되었'],
        correctAnswer: 1,
        explanation: '의도를 나타낼 때는 ~려고를 사용합니다.',
      },
      {
        id: 't2-5',
        question: '아침 ___ 운동해요.',
        options: ['에', '에서', '을', '이'],
        correctAnswer: 0,
        explanation: '시간을 나타낼 때는 ~에를 사용합니다.',
      },
    ],
  },
  {
    id: 'lesson-3',
    title: 'Lesson 3: 형용사와 명사',
    description: 'Adjectives and Nouns',
    level: 'Level 2',
    grammar: [
      {
        id: 'g3-1',
        korean: '~은/는 + 명사 (Adjective)',
        english: 'Adjective modifying noun',
        example: '빨간 사과 (Red apple)',
      },
      {
        id: 'g3-2',
        korean: '~하다 (Descriptive Verb)',
        english: 'Descriptive verb form',
        example: '깨끗하다 (To be clean)',
      },
      {
        id: 'g3-3',
        korean: '~지 않다 (Negation)',
        english: 'Negative form',
        example: '크지 않아요. (It is not big.)',
      },
      {
        id: 'g3-4',
        korean: '~보다 (Comparison)',
        english: 'Comparison particle',
        example: '형이 동생보다 커요. (Older brother is taller than younger brother.)',
      },
      {
        id: 'g3-5',
        korean: '~처럼 (Like/As)',
        english: 'Similarity',
        example: '별처럼 빛나요. (Shines like a star.)',
      },
    ],
    vocabulary: [
      {
        id: 'v3-1',
        word: '크다',
        korean: 'To be big',
        example: '이 집이 커요.',
      },
      {
        id: 'v3-2',
        word: '작다',
        korean: 'To be small',
        example: '손이 작아요.',
      },
      {
        id: 'v3-3',
        word: '빨강',
        korean: 'Red',
        example: '빨간 옷을 좋아해요.',
      },
      {
        id: 'v3-4',
        word: '깨끗하다',
        korean: 'To be clean',
        example: '방이 깨끗해요.',
      },
      {
        id: 'v3-5',
        word: '아름답다',
        korean: 'To be beautiful',
        example: '그 사람이 아름다워요.',
      },
    ],
    test: [
      {
        id: 't3-1',
        question: '____ 책을 읽고 있어요.',
        options: ['흥미있는', '흥미 있는', '흥미하는', '흥미 한'],
        correctAnswer: 0,
        explanation: '형용사는 명사 앞에 올 때 그대로 옵니다.',
      },
      {
        id: 't3-2',
        question: '이 방은 크지 ____.',
        options: ['않아요', '않았어요', '않은', '않어요'],
        correctAnswer: 0,
        explanation: '부정형은 ~지 않아요를 사용합니다.',
      },
      {
        id: 't3-3',
        question: '언니가 나____ 더 작아요.',
        options: ['보다', '에게', '와', '이'],
        correctAnswer: 0,
        explanation: '비교할 때는 ~보다를 사용합니다.',
      },
      {
        id: 't3-4',
        question: '그 여자가 배우____ 아름다워요.',
        options: ['처럼', '보다', '이', '처럼'],
        correctAnswer: 0,
        explanation: '유사성을 나타낼 때는 ~처럼을 사용합니다.',
      },
      {
        id: 't3-5',
        question: '하늘이 ____.',
        options: ['푸르다', '푸르어요', '푸르았어요', '푸르것'],
        correctAnswer: 1,
        explanation: '형용사의 현재형은 ~어요를 사용합니다.',
      },
    ],
  },
  {
    id: 'lesson-4',
    title: 'Lesson 4: 위치와 방향',
    description: 'Location and Direction',
    level: 'Level 2',
    grammar: [
      {
        id: 'g4-1',
        korean: '~위에 (On top of)',
        english: 'Indicates position above',
        example: '책상 위에 있어요.',
      },
      {
        id: 'g4-2',
        korean: '~아래에 (Below)',
        english: 'Indicates position below',
        example: '침대 아래에 있어요.',
      },
      {
        id: 'g4-3',
        korean: '~옆에 (Beside)',
        english: 'Indicates position beside',
        example: '나무 옆에 있어요.',
      },
      {
        id: 'g4-4',
        korean: '~앞에 (In front of)',
        english: 'Indicates position in front',
        example: '집 앞에 있어요.',
      },
      {
        id: 'g4-5',
        korean: '~뒤에 (Behind)',
        english: 'Indicates position behind',
        example: '산 뒤에 있어요.',
      },
    ],
    vocabulary: [
      {
        id: 'v4-1',
        word: '위',
        korean: 'Above/Top',
        example: '위에 있어요.',
      },
      {
        id: 'v4-2',
        word: '아래',
        korean: 'Below/Bottom',
        example: '아래에 있어요.',
      },
      {
        id: 'v4-3',
        word: '옆',
        korean: 'Side/Beside',
        example: '옆에 있어요.',
      },
      {
        id: 'v4-4',
        word: '앞',
        korean: 'Front',
        example: '앞에 있어요.',
      },
      {
        id: 'v4-5',
        word: '뒤',
        korean: 'Back/Behind',
        example: '뒤에 있어요.',
      },
    ],
    test: [
      {
        id: 't4-1',
        question: '책상 ___ 펜이 있어요.',
        options: ['위에', '아래에', '앞에', '옆에'],
        correctAnswer: 0,
        explanation: '물건이 위에 있으려면 ~위에를 사용합니다.',
      },
      {
        id: 't4-2',
        question: '침대 ___ 뭐가 있어요?',
        options: ['위에', '뒤에', '옆에', '아래에'],
        correctAnswer: 3,
        explanation: '침대 아래를 묻는 질문입니다.',
      },
      {
        id: 't4-3',
        question: '나무 ___ 의자가 있어요.',
        options: ['옆에', '위에', '아래에', '앞에'],
        correctAnswer: 0,
        explanation: '옆에 있으려면 ~옆에를 사용합니다.',
      },
      {
        id: 't4-4',
        question: '집 ___ 큰 나무가 있어요.',
        options: ['앞에', '뒤에', '위에', '옆에'],
        correctAnswer: 0,
        explanation: '집 앞을 나타낼 때는 ~앞에를 사용합니다.',
      },
      {
        id: 't4-5',
        question: '산 ___ 작은 마을이 있어요.',
        options: ['뒤에', '앞에', '위에', '아래에'],
        correctAnswer: 0,
        explanation: '산 뒤를 나타낼 때는 ~뒤에를 사용합니다.',
      },
    ],
  },
  {
    id: 'lesson-5',
    title: 'Lesson 5: 의문사와 질문',
    description: 'Question Words and Interrogatives',
    level: 'Level 2',
    grammar: [
      {
        id: 'g5-1',
        korean: '누가 (Who - Subject)',
        english: 'Question word for subject',
        example: '누가 왔어요?',
      },
      {
        id: 'g5-2',
        korean: '뭐/무엇을 (What - Object)',
        english: 'Question word for object',
        example: '뭐 먹었어요?',
      },
      {
        id: 'g5-3',
        korean: '언제 (When)',
        english: 'Question word for time',
        example: '언제 만나요?',
      },
      {
        id: 'g5-4',
        korean: '어디 (Where)',
        english: 'Question word for location',
        example: '어디 가요?',
      },
      {
        id: 'g5-5',
        korean: '왜 (Why)',
        english: 'Question word for reason',
        example: '왜 안 와요?',
      },
    ],
    vocabulary: [
      {
        id: 'v5-1',
        word: '누가',
        korean: 'Who',
        example: '누가 불렀어?',
      },
      {
        id: 'v5-2',
        word: '뭐',
        korean: 'What',
        example: '뭐 하고 있어?',
      },
      {
        id: 'v5-3',
        word: '언제',
        korean: 'When',
        example: '언제 나와?',
      },
      {
        id: 'v5-4',
        word: '어디',
        korean: 'Where',
        example: '어디 있어?',
      },
      {
        id: 'v5-5',
        word: '왜',
        korean: 'Why',
        example: '왜 웃어?',
      },
    ],
    test: [
      {
        id: 't5-1',
        question: '___ 왔어요? - 친구가 왔어요.',
        options: ['누가', '뭐가', '언제', '어디'],
        correctAnswer: 0,
        explanation: '주어를 묻는 질문입니다.',
      },
      {
        id: 't5-2',
        question: '___ 먹었어요? - 밥을 먹었어요.',
        options: ['누가', '뭐를', '언제', '어디에'],
        correctAnswer: 1,
        explanation: '목적어를 묻는 질문입니다.',
      },
      {
        id: 't5-3',
        question: '___ 만나요? - 내일 만나요.',
        options: ['누가', '뭐', '언제', '어디'],
        correctAnswer: 2,
        explanation: '시간을 묻는 질문입니다.',
      },
      {
        id: 't5-4',
        question: '___ 가요? - 학교에 가요.',
        options: ['누가', '뭐', '언제', '어디'],
        correctAnswer: 3,
        explanation: '장소를 묻는 질문입니다.',
      },
      {
        id: 't5-5',
        question: '___ 안 와요? - 바빠서 안 와요.',
        options: ['누가', '뭐', '언제', '왜'],
        correctAnswer: 3,
        explanation: '이유를 묻는 질문입니다.',
      },
    ],
  },
  {
    id: 'lesson-6',
    title: 'Lesson 6: 일상 활동',
    description: 'Daily Activities and Routines',
    level: 'Level 2',
    grammar: [
      {
        id: 'g6-1',
        korean: '~기 시작하다 (Begin to)',
        english: 'Start doing something',
        example: '공부하기 시작했어요.',
      },
      {
        id: 'g6-2',
        korean: '~기를 마치다 (Finish)',
        english: 'Finish doing something',
        example: '일하기를 마쳤어요.',
      },
      {
        id: 'g6-3',
        korean: '~도록 하다 (Make/Let)',
        english: 'To make/let someone do',
        example: '아이에게 먹도록 해요.',
      },
      {
        id: 'g6-4',
        korean: '~ㄴ/은 후에 (After)',
        english: 'After doing something',
        example: '밥을 먹은 후에 나갔어요.',
      },
      {
        id: 'g6-5',
        korean: '~기 전에 (Before)',
        english: 'Before doing something',
        example: '밥을 먹기 전에 기도해요.',
      },
    ],
    vocabulary: [
      {
        id: 'v6-1',
        word: '일어나다',
        korean: 'To wake up',
        example: '일찍 일어나요.',
      },
      {
        id: 'v6-2',
        word: '씻다',
        korean: 'To wash',
        example: '얼굴을 씻어요.',
      },
      {
        id: 'v6-3',
        word: '옷을 입다',
        korean: 'To put on clothes',
        example: '옷을 입어요.',
      },
      {
        id: 'v6-4',
        word: '나가다',
        korean: 'To go out',
        example: '학교에 나가요.',
      },
      {
        id: 'v6-5',
        word: '돌아오다',
        korean: 'To come back',
        example: '집에 돌아왔어요.',
      },
    ],
    test: [
      {
        id: 't6-1',
        question: '공부하기 ___ 했어요.',
        options: ['시작', '마침', '전', '후'],
        correctAnswer: 0,
        explanation: '시작하다는 ~기 시작하다를 사용합니다.',
      },
      {
        id: 't6-2',
        question: '밥을 먹은 ___ 나갔어요.',
        options: ['전에', '후에', '때', '동안'],
        correctAnswer: 1,
        explanation: '~은 후에는 과거 행동 후를 나타냅니다.',
      },
      {
        id: 't6-3',
        question: '학교에 가기 ___ 준비해요.',
        options: ['전에', '후에', '시작', '마침'],
        correctAnswer: 0,
        explanation: '~기 전에는 미래의 행동 전을 나타냅니다.',
      },
      {
        id: 't6-4',
        question: '아침에 일어나서 ___ 씻어요.',
        options: ['얼굴을', '머리를', '손을', '몸을'],
        correctAnswer: 0,
        explanation: '아침에 일반적으로 얼굴을 씻습니다.',
      },
      {
        id: 't6-5',
        question: '일을 마친 ___ 집에 돌아왔어요.',
        options: ['전에', '후에', '동안', '때'],
        correctAnswer: 1,
        explanation: '일 후에 집에 돌아오는 것입니다.',
      },
    ],
  },
  {
    id: 'lesson-7',
    title: 'Lesson 7: 음식과 식사',
    description: 'Food and Dining',
    level: 'Level 3',
    grammar: [
      {
        id: 'g7-1',
        korean: '~같은 (Same as)',
        english: 'Similar to',
        example: '너 같은 사람이 없어요.',
      },
      {
        id: 'g7-2',
        korean: '~만큼 (As much as)',
        english: 'To the extent of',
        example: '형만큼 먹어요.',
      },
      {
        id: 'g7-3',
        korean: '~도 (Also/Too)',
        english: 'Inclusive particle',
        example: '나도 가요.',
      },
      {
        id: 'g7-4',
        korean: '~밖에 (Only)',
        english: 'Exclusive particle',
        example: '돈이 천원밖에 없어요.',
      },
      {
        id: 'g7-5',
        korean: '~는데 (But/However)',
        english: 'Contrast connector',
        example: '좋은데 비싸요.',
      },
    ],
    vocabulary: [
      {
        id: 'v7-1',
        word: '밥',
        korean: 'Rice/Meal',
        example: '밥을 먹어요.',
      },
      {
        id: 'v7-2',
        word: '반찬',
        korean: 'Side dish',
        example: '반찬이 맛있어요.',
      },
      {
        id: 'v7-3',
        word: '국',
        korean: 'Soup',
        example: '국을 마셔요.',
      },
      {
        id: 'v7-4',
        word: '맛있다',
        korean: 'To be delicious',
        example: '이 음식이 맛있어요.',
      },
      {
        id: 'v7-5',
        word: '배부르다',
        korean: 'To be full',
        example: '배가 불러요.',
      },
    ],
    test: [
      {
        id: 't7-1',
        question: '이 음식은 너___ 맛있어요.',
        options: ['같은', '만큼', '도', '밖에'],
        correctAnswer: 0,
        explanation: '~같은은 유사성을 나타냅니다.',
      },
      {
        id: 't7-2',
        question: '나도 ___ 먹어요.',
        options: ['밥을', '밥이', '밥은', '밥에'],
        correctAnswer: 0,
        explanation: '목적어에는 ~을/를를 사용합니다.',
      },
      {
        id: 't7-3',
        question: '국이 맛있는___ 좀 맵아요.',
        options: ['는데', '는데요', '면', '으면'],
        correctAnswer: 0,
        explanation: '대조를 나타낼 때는 ~는데를 사용합니다.',
      },
      {
        id: 't7-4',
        question: '돈이 천원___ 없어요.',
        options: ['밖에', '만큼', '도', '같은'],
        correctAnswer: 0,
        explanation: '~밖에는 부정과 함께 유일함을 나타냅니다.',
      },
      {
        id: 't7-5',
        question: '이 반찬___ 맛있어요.',
        options: ['이', '은', '이', '도'],
        correctAnswer: 3,
        explanation: '추가를 나타낼 때는 ~도를 사용합니다.',
      },
    ],
  },
  {
    id: 'lesson-8',
    title: 'Lesson 8: 쇼핑',
    description: 'Shopping and Bargaining',
    level: 'Level 3',
    grammar: [
      {
        id: 'g8-1',
        korean: '~ㄴ/은 모양이다 (Seems like)',
        english: 'Appears to be',
        example: '비온 모양이에요.',
      },
      {
        id: 'g8-2',
        korean: '~ㄹ/을 리가 없다 (Cannot be)',
        english: 'It cannot be',
        example: '그럴 리가 없어요.',
      },
      {
        id: 'g8-3',
        korean: '~다면서 (I heard that)',
        english: 'Reported speech',
        example: '너가 간다면서?',
      },
      {
        id: 'g8-4',
        korean: '~자마자 (As soon as)',
        english: 'Immediately after',
        example: '도착하자마자 먹었어요.',
      },
      {
        id: 'g8-5',
        korean: '~아야/어야 한다 (Must/Should)',
        english: 'Necessity',
        example: '공부해야 해요.',
      },
    ],
    vocabulary: [
      {
        id: 'v8-1',
        word: '물건',
        korean: 'Item/Thing',
        example: '물건을 사요.',
      },
      {
        id: 'v8-2',
        word: '가격',
        korean: 'Price',
        example: '가격이 비싸요.',
      },
      {
        id: 'v8-3',
        word: '싸다',
        korean: 'To be cheap',
        example: '싼 물건을 사고 싶어요.',
      },
      {
        id: 'v8-4',
        word: '비싸다',
        korean: 'To be expensive',
        example: '이건 너무 비싸요.',
      },
      {
        id: 'v8-5',
        word: '돈',
        korean: 'Money',
        example: '돈이 있어요.',
      },
    ],
    test: [
      {
        id: 't8-1',
        question: '비온 ___ 이에요.',
        options: ['모양이', '리', '같은', '모습'],
        correctAnswer: 0,
        explanation: '~ㄴ 모양이다는 "~인 것 같다"는 의미입니다.',
      },
      {
        id: 't8-2',
        question: '그럴 ___ 없어요.',
        options: ['리가', '것이', '뜻이', '말'],
        correctAnswer: 0,
        explanation: '~을 리가 없다는 부정을 강조합니다.',
      },
      {
        id: 't8-3',
        question: '너가 산다___?',
        options: ['면서', '다면서', '자마자', '아야'],
        correctAnswer: 1,
        explanation: '~다면서는 전해 들은 말을 확인하는 표현입니다.',
      },
      {
        id: 't8-4',
        question: '도착하___ 밥을 먹었어요.',
        options: ['자마자', '아마', '려면', '기만'],
        correctAnswer: 0,
        explanation: '~자마자는 바로 그 직후를 나타냅니다.',
      },
      {
        id: 't8-5',
        question: '공부___ 해요.',
        options: ['아야', '어야', '려고', '도록'],
        correctAnswer: 1,
        explanation: '~어야 한다는 의무/필요를 나타냅니다.',
      },
    ],
  },
  {
    id: 'lesson-9',
    title: 'Lesson 9: 여행과 관광',
    description: 'Travel and Tourism',
    level: 'Level 3',
    grammar: [
      {
        id: 'g9-1',
        korean: '~ㄴ다고 하다 (Say that)',
        english: 'Reported statement',
        example: '간다고 했어요.',
      },
      {
        id: 'g9-2',
        korean: '~ㄴ다는 것을 (The fact that)',
        english: 'Nominalization',
        example: '그가 왔다는 것을 몰랐어요.',
      },
      {
        id: 'g9-3',
        korean: '~라고 하다 (Say)',
        english: 'Direct command in reported speech',
        example: '이리 오라고 했어요.',
      },
      {
        id: 'g9-4',
        korean: '~는다는 것 (The ~ing thing)',
        english: 'Present nominalization',
        example: '먹는다는 것은 어려워요.',
      },
      {
        id: 'g9-5',
        korean: '~았/었다고 하다 (Said that)',
        english: 'Reported past',
        example: '갔다고 했어요.',
      },
    ],
    vocabulary: [
      {
        id: 'v9-1',
        word: '여행',
        korean: 'Travel',
        example: '여행을 가요.',
      },
      {
        id: 'v9-2',
        word: '관광',
        korean: 'Sightseeing',
        example: '관광을 좋아해요.',
      },
      {
        id: 'v9-3',
        word: '호텔',
        korean: 'Hotel',
        example: '호텔에 묵어요.',
      },
      {
        id: 'v9-4',
        word: '지도',
        korean: 'Map',
        example: '지도를 봐요.',
      },
      {
        id: 'v9-5',
        word: '경치',
        korean: 'Scenery',
        example: '경치가 아름다워요.',
      },
    ],
    test: [
      {
        id: 't9-1',
        question: '그가 간___ 했어요.',
        options: ['다고', '다는', '라고', '나고'],
        correctAnswer: 0,
        explanation: '~ㄴ다고 하다는 과거 사항을 보고합니다.',
      },
      {
        id: 't9-2',
        question: '그가 왔다는 것을 ___.',
        options: ['몰랐어요', '알았어요', '봤어요', '들었어요'],
        correctAnswer: 0,
        explanation: '~ㄴ다는 것을은 명사화된 표현입니다.',
      },
      {
        id: 't9-3',
        question: '이리 오___ 했어요.',
        options: ['라고', '다고', '자고', '으로'],
        correctAnswer: 0,
        explanation: '~라고 하다는 명령문을 보고합니다.',
      },
      {
        id: 't9-4',
        question: '여행을 ___ 즐거워요.',
        options: ['가는', '간다는 것', '갈', '갔는'],
        correctAnswer: 1,
        explanation: '~ㄴ다는 것은 행위 자체를 명사화합니다.',
      },
      {
        id: 't9-5',
        question: '어제 갔___ 했어요.',
        options: ['다고', '었다고', '았다고', '은데'],
        correctAnswer: 2,
        explanation: '~았/었다고 하다는 과거를 보고합니다.',
      },
    ],
  },
  {
    id: 'lesson-10',
    title: 'Lesson 10: 감정과 표현',
    description: 'Emotions and Expressions',
    level: 'Level 3',
    grammar: [
      {
        id: 'g10-1',
        korean: '~ㄴ/은 척하다 (Pretend to be)',
        english: 'Pretend',
        example: '모른 척했어요.',
      },
      {
        id: 'g10-2',
        korean: '~ㄹ/을 뻔했다 (Almost did)',
        english: 'Nearly',
        example: '떨어질 뻔했어요.',
      },
      {
        id: 'g10-3',
        korean: '~기는커녕 (Far from/Let alone)',
        english: 'Much less',
        example: '가기는커녕 생각도 못 했어요.',
      },
      {
        id: 'g10-4',
        korean: '~할 수밖에 없다 (Have no choice but)',
        english: 'Inevitable',
        example: '웃을 수밖에 없었어요.',
      },
      {
        id: 'g10-5',
        korean: '~지 못하다 (Unable to)',
        english: 'Inability',
        example: '말을 못 했어요.',
      },
    ],
    vocabulary: [
      {
        id: 'v10-1',
        word: '행복하다',
        korean: 'To be happy',
        example: '행복해요.',
      },
      {
        id: 'v10-2',
        word: '슬프다',
        korean: 'To be sad',
        example: '슬퍼요.',
      },
      {
        id: 'v10-3',
        word: '화내다',
        korean: 'To be angry',
        example: '화냈어요.',
      },
      {
        id: 'v10-4',
        word: '놀라다',
        korean: 'To be surprised',
        example: '놀랐어요.',
      },
      {
        id: 'v10-5',
        word: '외롭다',
        korean: 'To be lonely',
        example: '외로워요.',
      },
    ],
    test: [
      {
        id: 't10-1',
        question: '모른 ___ 했어요.',
        options: ['척', '뜻', '뻔', '것'],
        correctAnswer: 0,
        explanation: '~척하다는 "~인 척하다"는 의미입니다.',
      },
      {
        id: 't10-2',
        question: '떨어질 ___ 했어요.',
        options: ['뻔', '척', '뜻', '것'],
        correctAnswer: 0,
        explanation: '~ㄹ 뻔했다는 거의 다 했다는 의미입니다.',
      },
      {
        id: 't10-3',
        question: '가기는커녕 생각도 ___ 했어요.',
        options: ['못', '안', '아니', '없'],
        correctAnswer: 0,
        explanation: '~지 못하다는 불가능을 나타냅니다.',
      },
      {
        id: 't10-4',
        question: '웃을 수___ 없었어요.',
        options: ['밖에', '도', '만', '면'],
        correctAnswer: 0,
        explanation: '~할 수밖에 없다는 피할 수 없음을 나타냅니다.',
      },
      {
        id: 't10-5',
        question: '말을 ___ 했어요.',
        options: ['못', '안', '아니', '없'],
        correctAnswer: 0,
        explanation: '~지 못하다는 할 수 없음을 나타냅니다.',
      },
    ],
  },
];
