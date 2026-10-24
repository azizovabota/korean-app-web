'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import data from '@/data/listeningTopik.json';
import { LISTENING_PART_RANGES } from '@/lib/listeningParts';
import { getLessonProgress, getProfile, type Goal } from '@/lib/account';

const RIGHT = '#10B981';

export default function ListeningSetPartsPage() {
  const params = useParams();
  const setNumber = Number(params.set);
  const lesson = data.lessons.find((l) => l.number === setNumber);
  const [goal, setGoal] = useState<Goal | null | undefined>(undefined);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    getProfile().then((p) => setGoal(p?.goal ?? null));
    getLessonProgress().then((rows) => setCompleted(new Set(rows.map((r) => r.lesson_key))));
  }, []);

  if (!lesson) {
    return <p style={{ padding: spacing.lg }}>Набор не найден</p>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/listening" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>← Аудирование</Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 0 0` }}>Listening {lesson.number}</h1>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {goal !== undefined && goal !== 'topik_1_2' && (
          <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, color: colors.darkGray, fontSize: typography.sizes.sm }}>
            Скоро появится
          </div>
        )}

        {(goal === 'topik_1_2' || goal === undefined) &&
          LISTENING_PART_RANGES.map(([from, to], i) => {
            const partNo = i + 1;
            const numbers: number[] = [];
            for (let n = from; n <= to; n += 1) numbers.push(n);
            const done = completed.has(`listening-${setNumber}-p${partNo}`);
            return (
              <Link key={partNo} href={`/listening/${setNumber}/${partNo}`} style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)' }}>
                  <div>
                    <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>Question-{partNo}</h3>
                    <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                      Вопросы {numbers.join(', ')}
                    </p>
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
