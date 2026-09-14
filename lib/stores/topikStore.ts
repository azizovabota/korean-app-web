'use client';

import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export interface TopikQuestion {
  id: string;
  prompt_text: string;
  options: Array<{ key: string; text: string }>;
  correct_option: string;
  explanation: string;
  difficulty: number;
}

export interface TopikAttempt {
  id: string;
  mode: 'quick_diagnostic' | 'full_diagnostic';
  questions: TopikQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  startedAt: number;
}

interface TopikStore {
  attempt: TopikAttempt | null;
  loading: boolean;
  error: string | null;

  startQuickDiagnostic: (userId: string) => Promise<void>;
  answerQuestion: (questionId: string, option: string) => void;
  nextQuestion: () => void;
  submitAttempt: (userId: string) => Promise<{ score: number; level: string }>;
  reset: () => void;
}

export const useTopikStore = create<TopikStore>((set, get) => ({
  attempt: null,
  loading: false,
  error: null,

  startQuickDiagnostic: async (userId: string) => {
    set({ loading: true, error: null });

    // Mock data for demo
    const mockQuestions: TopikQuestion[] = [
      {
        id: '1',
        prompt_text: '다음 단어의 뜻은 무엇입니까?',
        options: [
          { key: '1', text: '먹다 (eat)' },
          { key: '2', text: '마시다 (drink)' },
          { key: '3', text: '자다 (sleep)' },
          { key: '4', text: '걷다 (walk)' },
        ],
        correct_option: '1',
        explanation: '먹다는 "eat"을 의미합니다.',
        difficulty: 2,
      },
      {
        id: '2',
        prompt_text: '빈 칸에 알맞은 단어를 고르세요: 아침에 _____ 마셔요.',
        options: [
          { key: '1', text: '밥' },
          { key: '2', text: '물' },
          { key: '3', text: '책' },
          { key: '4', text: '신발' },
        ],
        correct_option: '2',
        explanation: '물(water)은 마시는 것입니다.',
        difficulty: 2,
      },
      {
        id: '3',
        prompt_text: '다음 문장의 빈 칸을 채우세요: 나는 학교에 _____ 가요.',
        options: [
          { key: '1', text: '에서' },
          { key: '2', text: '에' },
          { key: '3', text: '는' },
          { key: '4', text: '를' },
        ],
        correct_option: '2',
        explanation: '목적지 표현은 "에"를 사용합니다.',
        difficulty: 2,
      },
      {
        id: '4',
        prompt_text: '올바른 문법을 고르세요: 친구가 _____.',
        options: [
          { key: '1', text: '왔어요' },
          { key: '2', text: '왔아요' },
          { key: '3', text: '오았어요' },
          { key: '4', text: '와았어요' },
        ],
        correct_option: '1',
        explanation: '과거 친절형은 "왔어요"입니다.',
        difficulty: 2,
      },
      {
        id: '5',
        prompt_text: '이 글의 주제는 무엇입니까? "한국의 전통 음식 김밥은 맛있고 건강합니다."',
        options: [
          { key: '1', text: '김밥은 비싼 음식이다' },
          { key: '2', text: '한국의 전통 음식 소개' },
          { key: '3', text: '야채는 건강하다' },
          { key: '4', text: '밥을 먹는 방법' },
        ],
        correct_option: '2',
        explanation: '글은 김밥이 무엇인지 설명합니다.',
        difficulty: 2,
      },
    ];

    setTimeout(() => {
      const attempt: TopikAttempt = {
        id: `attempt_${Date.now()}`,
        mode: 'quick_diagnostic',
        questions: mockQuestions,
        currentIndex: 0,
        answers: {},
        startedAt: Date.now(),
      };

      set({ attempt, loading: false });
    }, 500);
  },

  answerQuestion: (questionId: string, option: string) => {
    const { attempt } = get();
    if (!attempt) return;

    set({
      attempt: {
        ...attempt,
        answers: {
          ...attempt.answers,
          [questionId]: option,
        },
      },
    });
  },

  nextQuestion: () => {
    const { attempt } = get();
    if (!attempt) return;

    if (attempt.currentIndex < attempt.questions.length - 1) {
      set({
        attempt: {
          ...attempt,
          currentIndex: attempt.currentIndex + 1,
        },
      });
    }
  },

  submitAttempt: async (userId: string) => {
    const { attempt } = get();
    if (!attempt) throw new Error('No active attempt');

    try {
      set({ loading: true });

      let correctCount = 0;

      for (const question of attempt.questions) {
        const selected = attempt.answers[question.id];
        if (selected === question.correct_option) correctCount++;
      }

      const percentCorrect = (correctCount / attempt.questions.length) * 100;
      let predictedScore = Math.round((percentCorrect / 100) * 200);
      let predictedLevel = '2급';

      if (predictedScore >= 140) {
        predictedLevel = '1급';
      } else if (predictedScore < 80) {
        predictedLevel = '3급 이하';
      }

      const { error: insertError } = await supabase.from('topik_attempts').insert([
        {
          user_id: userId,
          mode: attempt.mode,
          predicted_score: predictedScore,
          predicted_level: predictedLevel,
          completed_at: new Date().toISOString(),
        },
      ]);

      if (insertError) throw insertError;

      set({ loading: false });
      return { score: predictedScore, level: predictedLevel };
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  reset: () => {
    set({ attempt: null, error: null });
  },
}));
