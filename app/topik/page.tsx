'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import data from '@/data/placementTest.json';
import { goalLabels, saveGoal, type Goal } from '@/lib/account';

const RIGHT = '#10B981';
const WRONG = '#EF4444';

type Level = '1-2' | '3-4' | '5-6';

interface PlacementQuestion {
  id: string;
  number: number;
  level: Level;
  skill: string;
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions = data.questions as PlacementQuestion[];
const LEVEL_TO_GOAL: Record<Level, Goal> = { '1-2': 'topik_1_2', '3-4': 'topik_3_4', '5-6': 'topik_5_6' };
const LEVEL_ORDER: Level[] = ['1-2', '3-4', '5-6'];
// Уровень считается пройденным, если в блоке верно не меньше 7 из 10 вопросов
const PASS_THRESHOLD = 7;

function placeLevel(answers: (number | null)[]): Level {
  const correctByLevel: Record<Level, number> = { '1-2': 0, '3-4': 0, '5-6': 0 };
  questions.forEach((q, i) => {
    if (answers[i] === q.correct) correctByLevel[q.level] += 1;
  });
  let result: Level = '1-2';
  for (const level of LEVEL_ORDER) {
    if (correctByLevel[level] >= PASS_THRESHOLD) result = level;
  }
  return result;
}

export default function PlacementTestPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    setSelected(null);
  }, [index]);

  const total = questions.length;
  const question = questions[index];
  const answered = selected !== null;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
  };

  const handleNext = () => {
    const finalAnswers = [...answers, selected];
    setAnswers(finalAnswers);
    if (index < total - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setAnswers([]);
    setFinished(false);
    setSaveError('');
  };

  const handleSave = async (level: Level) => {
    setSaving(true);
    setSaveError('');
    try {
      await saveGoal(LEVEL_TO_GOAL[level]);
      router.replace('/');
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Не удалось сохранить уровень');
      setSaving(false);
    }
  };

  if (finished) {
    const level = placeLevel(answers);
    const correctByLevel: Record<Level, number> = { '1-2': 0, '3-4': 0, '5-6': 0 };
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correctByLevel[q.level] += 1;
    });
    const goal = LEVEL_TO_GOAL[level];

    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
        <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Link href="/" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>← Главная</Link>
            <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 0 0` }}>Ваш уровень</h1>
          </div>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)', textAlign: 'center' }}>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0 }}>Рекомендуемый уровень</p>
            <p style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', color: colors.black, margin: `${spacing.sm} 0 0 0` }}>{goalLabels[goal]}</p>
          </div>

          <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg }}>
            {LEVEL_ORDER.map((lvl) => {
              const count = questions.filter((q) => q.level === lvl).length;
              return (
                <p key={lvl} style={{ fontSize: typography.sizes.sm, color: colors.black, margin: `0 0 ${spacing.sm} 0` }}>
                  {goalLabels[LEVEL_TO_GOAL[lvl]]}: {correctByLevel[lvl]} / {count}
                </p>
              );
            })}
          </div>

          {saveError && <p style={{ color: WRONG, fontSize: typography.sizes.sm, margin: 0 }}>{saveError}</p>}

          <button
            onClick={() => handleSave(level)}
            disabled={saving}
            style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: saving ? 'default' : 'pointer', opacity: saving ? 0.6 : 1 }}
          >
            {saving ? 'Сохранение…' : 'Сохранить уровень'}
          </button>
          <button
            onClick={restart}
            style={{ width: '100%', backgroundColor: colors.white, color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: '12px', padding: spacing.md, fontWeight: '600', cursor: 'pointer' }}
          >
            Пройти заново
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
            <Link href="/" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm }}>← Главная</Link>
            <span style={{ fontSize: typography.sizes.sm, opacity: 0.9 }}>Тест уровня · {index + 1} / {total}</span>
          </div>
          <div style={{ height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', backgroundColor: colors.white, width: `${((index + 1) / total) * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, marginBottom: spacing.lg, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
          <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `0 0 ${spacing.md} 0`, fontWeight: 'bold' }}>
            Вопрос {question.number}
          </p>
          <p style={{ fontSize: typography.sizes.base, color: colors.black, fontWeight: '600', lineHeight: '1.7', whiteSpace: 'pre-line', margin: 0 }}>
            {question.prompt}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, marginBottom: spacing.lg }}>
          {question.options.map((option, i) => {
            let border = colors.gray;
            let background = colors.white;
            if (answered && i === question.correct) {
              border = RIGHT;
              background = '#ECFDF5';
            } else if (answered && i === selected) {
              border = WRONG;
              background = '#FEF2F2';
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                style={{ padding: spacing.lg, borderRadius: '12px', border: `2px solid ${border}`, backgroundColor: background, color: colors.black, fontSize: typography.sizes.sm, textAlign: 'left', cursor: answered ? 'default' : 'pointer', transition: 'all 0.2s' }}
              >
                <span style={{ fontWeight: 'bold', marginRight: spacing.md }}>{String.fromCharCode(65 + i)}</span>
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={{ backgroundColor: colors.white, borderRadius: '12px', padding: spacing.lg, marginBottom: spacing.lg, borderLeft: `4px solid ${selected === question.correct ? RIGHT : WRONG}` }}>
            <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: selected === question.correct ? RIGHT : WRONG, margin: `0 0 ${spacing.sm} 0` }}>
              {selected === question.correct ? 'Правильно!' : 'Неправильно'}
            </p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.black, lineHeight: '1.6', margin: 0 }}>{question.explanation}</p>
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!answered}
          style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: answered ? 'pointer' : 'not-allowed', opacity: answered ? 1 : 0.5 }}
        >
          {index === total - 1 ? 'Посмотреть результат' : 'Далее'} →
        </button>
      </div>
    </div>
  );
}
