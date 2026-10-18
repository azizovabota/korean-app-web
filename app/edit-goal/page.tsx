'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProfile, goalLabels, saveGoal, type Goal } from '@/lib/account';
import { colors, typography, spacing } from '@/constants/colors';

const goals: Goal[] = ['topik_1_2', 'topik_3_4', 'topik_5_6'];

export default function EditGoalPage() {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal>('topik_1_2');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile().then((p) => {
      if (p?.goal) setGoal(p.goal);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await saveGoal(goal);
      setSaved(true);
      router.push('/');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Не удалось сохранить');
      setSaving(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm }}>← Главная</Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 0 0` }}>Изменить цель</h1>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0 }}>Выберите уровень, который хотите сдать:</p>
        {goals.map((g) => (
          <button
            key={g}
            onClick={() => setGoal(g)}
            style={{
              padding: spacing.lg,
              borderRadius: '12px',
              border: `2px solid ${goal === g ? colors.primary : colors.gray}`,
              backgroundColor: goal === g ? '#E0F7FA' : colors.white,
              color: colors.black,
              fontSize: typography.sizes.base,
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            {goalLabels[g]}
          </button>
        ))}

        {error && <p style={{ color: '#EF4444', fontSize: typography.sizes.sm, margin: 0 }}>{error}</p>}

        <button
          onClick={handleSave}
          disabled={saving}
          style={{ background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: 'pointer', marginTop: spacing.md, opacity: saving ? 0.6 : 1 }}
        >
          {saved ? 'Сохранено' : saving ? 'Сохраняем...' : 'Сохранить'}
        </button>
      </div>
    </div>
  );
}
