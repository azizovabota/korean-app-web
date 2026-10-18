'use client';

import { TopikQuestion } from '@/lib/stores/topikStore';
import { colors, typography, spacing } from '@/constants/colors';

interface TopikQuestionCardProps {
  question: TopikQuestion;
  selectedOption: string | null;
  onSelectOption: (option: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export function TopikQuestionCard({
  question,
  selectedOption,
  onSelectOption,
  questionNumber,
  totalQuestions,
}: TopikQuestionCardProps) {
  return (
    <div style={{ padding: spacing.lg, maxWidth: '100%' }}>
      <div style={{ marginBottom: spacing.lg }}>
        <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray }}>
          Вопрос {questionNumber} / {totalQuestions}
        </p>
      </div>

      <div
        style={{
          backgroundColor: colors.white,
          borderRadius: '8px',
          padding: spacing.lg,
          marginBottom: spacing.lg,
          borderLeft: '4px solid ' + colors.primary,
        }}
      >
        <p style={{ fontSize: typography.sizes.base, color: colors.black, fontWeight: '600' }}>
          {question.prompt_text}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {question.options.map((option) => (
          <button
            key={option.key}
            onClick={() => onSelectOption(option.key)}
            style={{
              backgroundColor: selectedOption === option.key ? '#F0F9FF' : colors.white,
              border: `2px solid ${selectedOption === option.key ? colors.primary : colors.gray}`,
              borderRadius: '8px',
              padding: spacing.md,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.md,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor:
                  selectedOption === option.key ? colors.primary : colors.lightGray,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: selectedOption === option.key ? colors.white : colors.black,
              }}
            >
              {option.key}
            </div>
            <span
              style={{
                flex: 1,
                fontSize: typography.sizes.sm,
                color: selectedOption === option.key ? colors.primary : colors.black,
                fontWeight: selectedOption === option.key ? '600' : 'normal',
                textAlign: 'left',
              }}
            >
              {option.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
