'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';
import { getDueMistakes, getLessonProgress, getMistakes, type LessonProgressRow, type MistakeRow } from '@/lib/account';

type StudyTab = 'learning' | 'incorrect';

const navItems = [
  { icon: '🏠', label: 'Главная', href: '/' },
  { icon: '❓', label: 'Уроки', href: '/questions' },
  { icon: '📚', label: 'Моё обучение', href: '/my-study', active: true },
  { icon: '📊', label: 'Анализ', href: '/analysis' },
];

const sourceLabels: Record<string, string> = {
  topik12: 'TOPIK 1–2 · чтение',
  listening: 'TOPIK 1–2 · аудирование',
  ci: 'CI',
};

function lessonTitle(key: string) {
  if (key.startsWith('listening-')) return `Listening ${key.replace('listening-', '')}`;
  const match = key.match(/^topik12-(\d+)-s(\d+)$/);
  if (match) return `Reading Lesson ${match[1]} · Question-${match[2]}`;
  return `Reading Lesson ${key.replace('topik12-', '')}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function MyStudyPage() {
  const [tab, setTab] = useState<StudyTab>('learning');
  const [lessons, setLessons] = useState<LessonProgressRow[] | null>(null);
  const [mistakes, setMistakes] = useState<MistakeRow[] | null>(null);
  const [dueCount, setDueCount] = useState(0);

  useEffect(() => {
    getLessonProgress().then(setLessons);
    getMistakes().then(setMistakes);
    getDueMistakes().then((rows) => setDueCount(rows.length));
  }, []);

  const tabs: { id: StudyTab; label: string }[] = [
    { id: 'learning', label: 'Обучение' },
    { id: 'incorrect', label: 'Ошибки' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '100px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: 0 }}>Моё обучение</h1>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.xl }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1,
                backgroundColor: tab === t.id ? colors.primary : colors.white,
                color: tab === t.id ? colors.white : colors.black,
                border: `2px solid ${tab === t.id ? colors.primary : colors.gray}`,
                borderRadius: '12px',
                padding: spacing.lg,
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'learning' && (
          <>
            {lessons === null && <p style={{ color: colors.darkGray }}>Загрузка...</p>}
            {lessons?.length === 0 && (
              <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, color: colors.darkGray, fontSize: typography.sizes.sm }}>
                История обучения пока пуста. Пройдите урок TOPIK, и он появится здесь.
              </div>
            )}
            {lessons?.map((row) => {
              return (
                <div key={row.lesson_key} style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, marginBottom: spacing.md, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>{lessonTitle(row.lesson_key)}</h3>
                    <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>{formatDate(row.completed_at)}</p>
                  </div>
                  <span style={{ fontWeight: 'bold', color: colors.primary }}>{row.score} / {row.total}</span>
                </div>
              );
            })}
          </>
        )}

        {tab === 'incorrect' && (
          <>
            <Link href="/review" style={{ display: 'block', textDecoration: 'none', marginBottom: spacing.lg }}>
              <div style={{ background: colors.gradient, color: colors.white, borderRadius: '12px', padding: spacing.lg, textAlign: 'center', fontWeight: '600' }}>
                🔁 Повторить сегодня ({dueCount})
              </div>
            </Link>
            {mistakes === null && <p style={{ color: colors.darkGray }}>Загрузка...</p>}
            {mistakes?.length === 0 && (
              <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, color: colors.darkGray, fontSize: typography.sizes.sm }}>
                У вас пока нет неправильных ответов.
              </div>
            )}
            {mistakes?.map((row) => (
              <div key={row.question_key} style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, marginBottom: spacing.md }}>
                <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `0 0 ${spacing.sm} 0` }}>
                  {sourceLabels[row.source] ?? row.source} · {formatDate(row.created_at)}
                </p>
                <p style={{ fontSize: typography.sizes.sm, color: colors.black, lineHeight: '1.6', whiteSpace: 'pre-line', margin: `0 0 ${spacing.md} 0` }}>{row.prompt}</p>
                <p style={{ fontSize: typography.sizes.sm, color: '#EF4444', margin: `0 0 ${spacing.xs} 0` }}>Ваш ответ: {row.user_answer}</p>
                <p style={{ fontSize: typography.sizes.sm, color: '#10B981', fontWeight: 'bold', margin: 0 }}>Правильно: {row.correct_answer}</p>
              </div>
            ))}
          </>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: colors.white, borderTop: `1px solid ${colors.gray}`, display: 'flex', justifyContent: 'space-around', padding: `${spacing.md} 0`, maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div style={{ textAlign: 'center', cursor: 'pointer', color: item.active ? colors.primary : colors.darkGray }}>
              <p style={{ fontSize: '24px', margin: `0 0 ${spacing.xs} 0` }}>{item.icon}</p>
              <p style={{ fontSize: typography.sizes.xs, margin: 0, fontWeight: item.active ? 'bold' : 'normal' }}>{item.label}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
