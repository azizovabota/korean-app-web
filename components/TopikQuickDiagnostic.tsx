'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useTopikStore } from '@/lib/stores/topikStore';
import { TopikQuestionCard } from './TopikQuestionCard';
import { colors, typography, spacing } from '@/constants/colors';

interface TopikQuickDiagnosticProps {
  userId: string;
  onComplete: (score: number, level: string) => void;
}

export function TopikQuickDiagnostic({ userId, onComplete }: TopikQuickDiagnosticProps) {
  const { attempt, loading, startQuickDiagnostic, answerQuestion, nextQuestion, prevQuestion, submitAttempt } =
    useTopikStore();

  useEffect(() => {
    startQuickDiagnostic(userId);
  }, [userId]);

  if (loading && !attempt) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <div style={{ fontSize: '20px' }}>⏳</div>
        <p style={{ color: colors.darkGray, marginTop: spacing.lg }}>문제를 불러오는 중...</p>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div style={{ textAlign: 'center', padding: spacing.lg }}>
        <p style={{ color: '#ef4444' }}>문제를 불러올 수 없습니다</p>
      </div>
    );
  }

  const currentQuestion = attempt.questions[attempt.currentIndex];
  const selectedOption = attempt.answers[currentQuestion.id] || null;
  const isLastQuestion = attempt.currentIndex === attempt.questions.length - 1;

  const handleNextOrSubmit = async () => {
    if (!selectedOption) {
      alert('답을 선택해주세요');
      return;
    }

    if (isLastQuestion) {
      try {
        const result = await submitAttempt(userId);
        onComplete(result.score, result.level);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      nextQuestion();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: spacing.lg, borderBottom: `1px solid ${colors.gray}`, backgroundColor: colors.white }}>
        <div style={{ display: 'flex', gap: spacing.md, maxWidth: '600px', margin: '0 auto' }}>
          <button
            onClick={prevQuestion}
            disabled={attempt?.currentIndex === 0}
            style={{
              backgroundColor: attempt?.currentIndex === 0 ? colors.gray : colors.lightGray,
              color: colors.black,
              border: `1px solid ${colors.gray}`,
              borderRadius: '8px',
              padding: `${spacing.sm} ${spacing.lg}`,
              fontSize: typography.sizes.sm,
              fontWeight: '600',
              cursor: attempt?.currentIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: attempt?.currentIndex === 0 ? 0.5 : 1,
            }}
          >
            ← Предыдущий
          </button>
          <Link href="/">
            <button
              style={{
                backgroundColor: colors.lightGray,
                color: colors.black,
                border: `1px solid ${colors.gray}`,
                borderRadius: '8px',
                padding: `${spacing.sm} ${spacing.lg}`,
                fontSize: typography.sizes.sm,
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              🏠 Домой
            </button>
          </Link>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <TopikQuestionCard
          question={currentQuestion}
          selectedOption={selectedOption}
          onSelectOption={(option) => answerQuestion(currentQuestion.id, option)}
          questionNumber={attempt.currentIndex + 1}
          totalQuestions={attempt.questions.length}
        />
      </div>

      <div
        style={{
          padding: spacing.lg,
          borderTop: `1px solid ${colors.gray}`,
          backgroundColor: colors.white,
        }}
      >
        <button
          onClick={handleNextOrSubmit}
          disabled={!selectedOption || loading}
          style={{
            width: '100%',
            backgroundColor: !selectedOption || loading ? '#BFDBFE' : colors.primary,
            color: colors.white,
            border: 'none',
            borderRadius: '8px',
            padding: `${spacing.md} ${spacing.lg}`,
            fontSize: typography.sizes.base,
            fontWeight: '600',
            cursor: !selectedOption || loading ? 'not-allowed' : 'pointer',
            opacity: !selectedOption || loading ? 0.6 : 1,
          }}
        >
          {isLastQuestion ? '결과 보기' : '다음 →'}
        </button>
      </div>
    </div>
  );
}
