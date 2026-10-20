'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import data from '@/data/topikBeginnerReading.json';
import { clearMistake, getProfile, recordLessonCompleted, recordMistake, type Goal } from '@/lib/account';

const WRONG = '#EF4444';
const RIGHT = '#10B981';

export default function TopikBeginnerQuizPage() {
  const params = useParams();
  const lessonNumber = Number(params.lessonId);
  const lesson = data.lessons.find((l) => l.number === lessonNumber);

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showStudy, setShowStudy] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [finished, setFinished] = useState(false);
  const [goal, setGoal] = useState<Goal | null | undefined>(undefined);

  useEffect(() => {
    getProfile().then((p) => setGoal(p?.goal ?? null));
  }, []);

  if (!lesson) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, padding: spacing.lg }}>
        <p style={{ color: colors.black }}>Урок не найден</p>
        <Link href="/topik/beginner" style={{ color: colors.primary }}>← К урокам</Link>
      </div>
    );
  }

  if (goal === undefined) return null;

  if (goal !== 'topik_1_2') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, padding: spacing.lg }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginTop: spacing.xl }}>
          <p style={{ fontSize: typography.sizes.base, color: colors.black }}>Скоро появится</p>
          <Link href="/topik/beginner" style={{ color: colors.primary }}>← К урокам</Link>
        </div>
      </div>
    );
  }

  const total = lesson.questions.length;
  const lessonKey = `topik12-${lesson.number}`;

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setShowStudy(false);
    setAnswers([]);
    setFinished(false);
  };

  if (finished) {
    const correct = lesson.questions.filter((q, i) => answers[i] === q.correct).length;
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
        <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', margin: 0 }}>
              Reading Lesson {lesson.number} — результат
            </h1>
          </div>
        </div>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, textAlign: 'center' }}>
          <p style={{ fontSize: typography.sizes['3xl'], fontWeight: 'bold', color: colors.black, margin: `${spacing.xl} 0 ${spacing.sm} 0` }}>
            {correct} / {total}
          </p>
          <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, marginBottom: spacing.xl }}>
            правильных ответов
          </p>
          <button
            onClick={restart}
            style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.md }}
          >
            Пройти заново
          </button>
          <Link href="/topik/beginner" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ border: `2px solid ${colors.primary}`, borderRadius: '12px', padding: spacing.lg, color: colors.black, fontWeight: '600' }}>
              ← К урокам
            </div>
          </Link>
        </div>
      </div>
    );
  }

  const question = lesson.questions[index];

  let groupFirst = index;
  while (groupFirst > 0 && lesson.questions[groupFirst - 1].skill === question.skill) groupFirst -= 1;
  let groupLast = index;
  while (groupLast + 1 < total && lesson.questions[groupLast + 1].skill === question.skill) groupLast += 1;
  const showGroupHeader = groupFirst === index;
  const instruction = (data as { readingRules: Record<string, string> }).readingRules[question.skill];
  const firstNumber = lesson.questions[groupFirst].number;
  const lastNumber = lesson.questions[groupLast].number;
  const rangeLabel = firstNumber === lastNumber ? `[${firstNumber}]` : `[${firstNumber}～${lastNumber}]`;
  const stem = question.prompt
    .split(/\n| \/ /)
    .filter((part) => !/고르십시오|고르세요/.test(part))
    .join('\n');

  const answered = selected !== null;
  const isWrong = answered && selected !== question.correct;

  const handleSelect = (i: number) => {
    if (answered) return;
    setSelected(i);
    const mistakeKey = `${lessonKey}-${question.number}`;
    if (i === question.correct) {
      clearMistake(mistakeKey);
    } else {
      recordMistake({
        question_key: mistakeKey,
        source: 'topik12',
        prompt: question.prompt,
        user_answer: question.options[i],
        correct_answer: question.options[question.correct],
      });
    }
  };

  const handleNext = () => {
    const finalAnswers = [...answers, selected];
    setAnswers(finalAnswers);
    setSelected(null);
    setShowStudy(false);
    if (index < total - 1) {
      setIndex(index + 1);
    } else {
      const score = lesson.questions.filter((q, i) => finalAnswers[i] === q.correct).length;
      recordLessonCompleted(lessonKey, score, total);
      setFinished(true);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
            <Link href="/topik/beginner" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm }}>
              ← Уроки
            </Link>
            <span style={{ fontSize: typography.sizes.sm, opacity: 0.9 }}>
              Reading Lesson {lesson.number} · {index + 1} / {total}
            </span>
          </div>
          <div style={{ height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', backgroundColor: colors.white, width: `${((index + 1) / total) * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {showGroupHeader && (
          <p style={{ fontSize: typography.sizes.base, color: colors.black, fontWeight: 'bold', lineHeight: '1.6', borderLeft: `4px solid ${colors.primary}`, paddingLeft: spacing.md, margin: `0 0 ${spacing.lg} 0` }}>
            ※ {rangeLabel} {instruction}
          </p>
        )}
        <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, marginBottom: spacing.lg, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' }}>
          <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `0 0 ${spacing.md} 0`, fontWeight: 'bold' }}>
            Вопрос #{question.number}
          </p>
          <p style={{ fontSize: typography.sizes.base, color: colors.black, fontWeight: '600', lineHeight: '1.7', whiteSpace: 'pre-line', margin: 0 }}>
            {stem}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, marginBottom: spacing.lg }}>
          {question.options.map((option, i) => {
            let border = colors.gray;
            let background = colors.white;
            if (answered && i === question.correct) {
              border = RIGHT;
              background = '#ECFDF5';
            } else if (answered && i === selected && isWrong) {
              border = WRONG;
              background = '#FEF2F2';
            }
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                style={{
                  padding: spacing.lg,
                  borderRadius: '12px',
                  border: `2px solid ${border}`,
                  backgroundColor: background,
                  color: colors.black,
                  fontSize: typography.sizes.sm,
                  textAlign: 'left',
                  cursor: answered ? 'default' : 'pointer',
                  boxShadow: answered && i === selected && isWrong ? `0 0 12px ${WRONG}` : 'none',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontWeight: 'bold', marginRight: spacing.md }}>{String.fromCharCode(65 + i)}</span>
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div style={{ marginBottom: spacing.lg }}>
            <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: isWrong ? WRONG : RIGHT, margin: `0 0 ${spacing.md} 0` }}>
              {isWrong ? 'Неправильно' : 'Правильно!'}
            </p>
            <button
              onClick={() => setShowStudy(!showStudy)}
              style={{ width: '100%', backgroundColor: colors.white, color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: '12px', padding: spacing.md, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.md }}
            >
              {showStudy ? 'Скрыть тему' : '📖 Изучить тему'}
            </button>

            {showStudy && (
              <div style={{ backgroundColor: colors.white, borderRadius: '12px', padding: spacing.lg, marginBottom: spacing.md, borderLeft: `4px solid ${colors.primary}` }}>
                <p style={{ fontSize: typography.sizes.sm, color: colors.black, lineHeight: '1.6', margin: `0 0 ${spacing.lg} 0` }}>
                  {question.explanation}
                </p>

                {question.grammar.length > 0 && (
                  <>
                    <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: colors.primary, margin: `0 0 ${spacing.sm} 0` }}>Грамматика</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, marginBottom: spacing.lg }}>
                      {question.grammar.map((g) => (
                        <div key={g.pattern}>
                          <p style={{ fontSize: typography.sizes.sm, margin: 0, color: colors.black, lineHeight: '1.5' }}>
                            <strong>{g.pattern}</strong> — {g.meaning}
                          </p>
                          {g.examples.map((ex) => (
                            <div
                              key={ex.ko}
                              style={{ marginTop: spacing.sm, marginLeft: spacing.sm, paddingLeft: spacing.md, borderLeft: `2px solid ${colors.primaryLight}` }}
                            >
                              <p style={{ fontSize: typography.sizes.sm, margin: 0, color: colors.black }}>{ex.ko}</p>
                              <p style={{ fontSize: typography.sizes.xs, margin: `2px 0 0 0`, color: colors.darkGray }}>{ex.ru}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {question.words.length > 0 && (
                  <>
                    <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: colors.primary, margin: `0 0 ${spacing.sm} 0` }}>Слова</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
                      {question.words.map((w) => (
                        <p key={w.word} style={{ fontSize: typography.sizes.sm, margin: 0, color: colors.black }}>
                          <strong>{w.word}</strong> — {w.translation}
                        </p>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!answered}
          style={{
            width: '100%',
            background: colors.gradient,
            color: colors.white,
            border: 'none',
            borderRadius: '12px',
            padding: spacing.lg,
            fontSize: typography.sizes.base,
            fontWeight: '600',
            cursor: answered ? 'pointer' : 'not-allowed',
            opacity: answered ? 1 : 0.5,
          }}
        >
          {index === total - 1 ? 'Завершить' : 'Далее'} →
        </button>
      </div>
    </div>
  );
}
