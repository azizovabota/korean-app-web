'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';
import { getLessonProgress, getProfile, type Goal } from '@/lib/account';
import data from '@/data/listeningTopik.json';

const RIGHT = '#10B981';

export default function ListeningListPage() {
  const [goal, setGoal] = useState<Goal | null | undefined>(undefined);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    getProfile().then((p) => setGoal(p?.goal ?? null));
    getLessonProgress().then((rows) => setCompleted(new Set(rows.map((r) => r.lesson_key))));
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/questions" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>← Уроки</Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 ${spacing.sm} 0` }}>Аудирование TOPIK 1–2</h1>
          <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: 0 }}>Правила каждого раздела озвучиваются перед вопросами</p>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {goal !== undefined && goal !== 'topik_1_2' && (
          <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, color: colors.darkGray, fontSize: typography.sizes.sm }}>
            Скоро появится
          </div>
        )}

        {(goal === 'topik_1_2' || goal === undefined) &&
          data.lessons.map((lesson) => {
            const done = completed.has(`listening-${lesson.number}`);
            return (
              <Link key={lesson.number} href={`/listening/${lesson.number}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)' }}>
                  <div>
                    <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>Listening {lesson.number}</h3>
                    <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>{lesson.questions.length} вопросов · {lesson.sections.length} разделов</p>
                  </div>
                  <span style={{ fontSize: typography.sizes.lg, color: done ? RIGHT : colors.primary }}>{done ? '✓' : '→'}</span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
