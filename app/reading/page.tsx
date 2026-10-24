'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import { getProfile, type Goal } from '@/lib/account';

const READING_BY_GOAL: Partial<Record<Goal, string>> = {
  topik_1_2: '/topik/beginner',
  topik_3_4: '/topik/intermediate',
};

export default function ReadingPage() {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal | null | undefined>(undefined);

  useEffect(() => {
    getProfile().then((p) => setGoal(p?.goal ?? null));
  }, []);

  useEffect(() => {
    if (goal === undefined || goal === null) return;
    const target = READING_BY_GOAL[goal];
    if (target) router.replace(target);
  }, [goal, router]);

  if (goal === undefined || (goal && READING_BY_GOAL[goal])) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, padding: spacing.lg }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, color: colors.darkGray, fontSize: typography.sizes.sm }}>
        Скоро появится
      </div>
    </div>
  );
}
