'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import { loadGrammarTopic, isExerciseCorrect, type GrammarTopic } from '@/lib/grammar';
import { recordMistake } from '@/lib/account';

const RIGHT = '#10B981';
const WRONG = '#EF4444';

export default function GrammarExercisesPage() {
  const params = useParams();
  const topicId = String(params.topic);

  const [loaded, setLoaded] = useState<{ id: string; topic: GrammarTopic | undefined } | null>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let cancelled = false;
    loadGrammarTopic(topicId).then((topic) => {
      if (!cancelled) setLoaded({ id: topicId, topic });
    });
    return () => {
      cancelled = true;
    };
  }, [topicId]);

  const topic = loaded?.id === topicId ? loaded.topic : undefined;

  if (loaded?.id === topicId && !topic) {
    return <p style={{ padding: spacing.lg }}>Тема не найдена</p>;
  }
  if (!topic) {
    return <p style={{ padding: spacing.lg }}>Загрузка…</p>;
  }

  const total = topic.exercises.length;
  const finished = index >= total;
  const exercise = topic.exercises[index];

  const nextExercise = () => {
    setIndex((i) => i + 1);
    setAnswer('');
    setResult(null);
    setShowTranslation(false);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setAnswer('');
    setResult(null);
    setShowTranslation(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (result) {
      nextExercise();
      return;
    }
    if (!answer.trim()) return;
    const correct = isExerciseCorrect(answer, exercise.correct_answer);
    setResult(correct ? 'correct' : 'wrong');
    if (correct) {
      setScore((s) => s + 1);
    } else {
      recordMistake({
        question_key: `grammar-${topic.id}-${exercise.exercise_number}`,
        source: 'grammar',
        prompt: `${exercise.sentence_before}___${exercise.sentence_after}`,
        user_answer: answer.trim(),
        correct_answer: exercise.correct_answer,
      });
    }
  };

  const cardStyle = { backgroundColor: colors.white, borderRadius: '16px', padding: spacing.xl, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', textAlign: 'center' as const };
  const borderColor = result === 'correct' ? RIGHT : result === 'wrong' ? WRONG : colors.primary;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: spacing.md }}>
          <Link href="/grammar" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm }}>← Темы</Link>
          <span style={{ fontSize: typography.sizes.base, fontWeight: 'bold' }}>{topic.korean}</span>
          {!finished && <span style={{ fontSize: typography.sizes.sm, opacity: 0.9 }}>{index + 1} / {total}</span>}
        </div>
        <div style={{ maxWidth: '600px', margin: `${spacing.md} auto 0 auto`, height: '6px', borderRadius: '3px', backgroundColor: 'rgba(255, 255, 255, 0.35)' }}>
          <div style={{ width: `${(index / total) * 100}%`, height: '100%', borderRadius: '3px', backgroundColor: colors.white, transition: 'width 0.3s' }} />
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {finished ? (
          <div style={cardStyle}>
            <p style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', color: colors.black, margin: `0 0 ${spacing.sm} 0` }}>Тема пройдена</p>
            <p style={{ fontSize: typography.sizes.base, color: colors.black, margin: `0 0 ${spacing.xl} 0` }}>
              Верно: {score} из {total}
            </p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `0 0 ${spacing.lg} 0` }}>{topic.russian}</p>
            <button onClick={restart} style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.md }}>
              Пройти ещё раз
            </button>
            <Link href="/grammar" style={{ display: 'block', color: colors.primary, fontSize: typography.sizes.sm, textDecoration: 'none' }}>← Все темы</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
            <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
              <div>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `0 0 ${spacing.sm} 0` }}>Введите в правильной форме</p>
                <span style={{ display: 'inline-block', fontSize: typography.sizes.sm, fontWeight: '600', color: colors.black, backgroundColor: colors.lightGray, borderRadius: '8px', padding: `${spacing.xs} ${spacing.md}` }}>
                  {exercise.prompt_korean} · {exercise.prompt_russian}
                </span>
              </div>

              <p style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, lineHeight: 2.4, margin: `${spacing.md} 0`, wordBreak: 'keep-all' }}>
                {exercise.sentence_before}
                <input
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  disabled={result !== null}
                  autoFocus
                  aria-label="Ваш ответ"
                  style={{ width: '9em', margin: '0 4px', padding: `${spacing.xs} ${spacing.sm}`, border: 'none', borderBottom: `2px solid ${borderColor}`, outline: 'none', fontSize: 'inherit', fontWeight: 'bold', textAlign: 'center', color: result === 'wrong' ? WRONG : colors.black, backgroundColor: 'transparent' }}
                />
                {exercise.sentence_after}
              </p>

              <button
                type="button"
                onClick={() => setShowTranslation((v) => !v)}
                style={{ alignSelf: 'center', background: 'none', border: 'none', color: colors.darkGray, fontSize: typography.sizes.sm, cursor: 'pointer' }}
              >
                {showTranslation ? 'Скрыть перевод' : 'Перевод'}
              </button>
              {showTranslation && (
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0 }}>{exercise.translation_ru}</p>
              )}
            </div>

            {result && (
              <div style={{ ...cardStyle, padding: spacing.lg, textAlign: 'left', borderLeft: `4px solid ${borderColor}` }}>
                <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: borderColor, margin: `0 0 ${spacing.sm} 0` }}>
                  {result === 'correct' ? 'Верно!' : 'Неверно'}
                </p>
                {result === 'wrong' && (
                  <p style={{ fontSize: typography.sizes.sm, color: colors.black, margin: `0 0 ${spacing.sm} 0` }}>
                    Правильно: <b>{exercise.correct_answer}</b>
                  </p>
                )}
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0 }}>{exercise.translation_ru}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={result === null && !answer.trim()}
              style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: 'pointer', opacity: result === null && !answer.trim() ? 0.5 : 1 }}
            >
              {result === null ? 'Проверить' : index + 1 < total ? 'Далее →' : 'Завершить'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
