'use client';

import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';
import { CHEAT_SHEET_LEVELS } from '@/lib/cheatsheets';

export default function CheatSheetLevelsPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/questions" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>← Практика слов</Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 0 0` }}>Шпаргалки</h1>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {CHEAT_SHEET_LEVELS.map((level) => (
          <Link key={level.number} href={`/cheatsheets/${level.number}`} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)' }}>
              <div>
                <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>Level {level.number}</h3>
                <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                  Шпаргалок: {level.sheets.length}
                </p>
              </div>
              <span style={{ fontSize: typography.sizes.lg, color: colors.primary }}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
