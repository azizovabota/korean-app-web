'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getLessonProgress, getProfile, type Goal } from '@/lib/account';
import { colors, typography, spacing } from '@/constants/colors';
import rawData from '@/data/topikAdvancedReading.json';
import type { ReadingData } from '@/lib/readingData';

const data = rawData as ReadingData;
import { READING_SET_RANGES } from '@/lib/readingSets';

const RIGHT = '#10B981';

export default function TopikAdvancedLessonsPage() {
  const [goal, setGoal] = useState<Goal | null | undefined>(undefined);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const isLessonDone = (number: number) =>
    READING_SET_RANGES.every((_, i) => completed.has(`topik56-${number}-s${i + 1}`));

  useEffect(() => {
    getProfile().then((p) => setGoal(p?.goal ?? null));
    getLessonProgress().then((rows) => setCompleted(new Set(rows.map((r) => r.lesson_key))));
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div
        style={{
          background: colors.gradient,
          color: colors.white,
          padding: `${spacing.xl} ${spacing.lg}`,
          borderRadius: '0 0 24px 24px',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/questions" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>
            ← Lesson
          </Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 ${spacing.sm} 0` }}>
            TOPIK Beginner 1/2
          </h1>
          <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: 0 }}>
            Чтение · TOPIK I, уровень начальный
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
        {goal !== undefined && goal !== 'topik_5_6' && (
          <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, color: colors.darkGray, fontSize: typography.sizes.sm }}>
            Скоро появится
          </div>
        )}

        {(goal === 'topik_5_6' || goal === undefined) && data.lessons.map((lesson) => (
          <Link key={lesson.number} href={`/topik/advanced/${lesson.number}`} style={{ textDecoration: 'none' }}>
            <div
              style={{
                backgroundColor: colors.white,
                borderRadius: '16px',
                padding: spacing.lg,
                boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: spacing.md,
              }}
            >
              <div>
                <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>
                  Reading Lesson {lesson.number}
                </h3>
                <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                  {lesson.questions.length} вопросов · {lesson.questionSet}
                </p>
              </div>
              <span style={{ fontSize: typography.sizes.lg, color: isLessonDone(lesson.number) ? RIGHT : colors.primary }}>
                {isLessonDone(lesson.number) ? '✓' : '→'}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
