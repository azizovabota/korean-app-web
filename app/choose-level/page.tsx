'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import { goalLabels, saveGoal, type Goal } from '@/lib/account';
import { markLevelChosen } from '@/lib/levelSession';

const levels: Goal[] = ['topik_1_2', 'topik_3_4', 'topik_5_6'];

export default function ChooseLevelPage() {
  const router = useRouter();
  const [saving, setSaving] = useState<Goal | null>(null);
  const [error, setError] = useState('');

  async function choose(goal: Goal) {
    setSaving(goal);
    setError('');
    try {
      await saveGoal(goal);
      markLevelChosen();
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось сохранить уровень');
      setSaving(null);
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: spacing.lg }}>
      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: colors.white, borderRadius: '16px', padding: spacing.xl, boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)' }}>
        <h1 style={{ fontSize: typography.sizes.xl, fontWeight: 'bold', color: colors.black, margin: `0 0 ${spacing.sm} 0` }}>Выберите уровень</h1>
        <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `0 0 ${spacing.lg} 0` }}>Материалы откроются для выбранного уровня</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          {levels.map((goal) => (
            <button
              key={goal}
              onClick={() => choose(goal)}
              disabled={saving !== null}
              style={{
                border: `2px solid ${colors.primary}`,
                borderRadius: '12px',
                padding: spacing.md,
                backgroundColor: colors.white,
                color: colors.black,
                fontSize: typography.sizes.base,
                fontWeight: '600',
                cursor: saving ? 'default' : 'pointer',
                opacity: saving && saving !== goal ? 0.5 : 1,
              }}
            >
              {saving === goal ? 'Сохранение…' : goalLabels[goal]}
            </button>
          ))}
        </div>

        {error && <p style={{ color: '#E53935', fontSize: typography.sizes.sm, margin: `${spacing.md} 0 0 0` }}>{error}</p>}
      </div>
    </div>
  );
}
