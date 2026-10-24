'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import { getCheatSheetLevel } from '@/lib/cheatsheets';

export default function CheatSheetLevelPage() {
  const params = useParams();
  const level = getCheatSheetLevel(Number(params.level));

  if (!level) {
    return <p style={{ padding: spacing.lg }}>Уровень не найден</p>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/cheatsheets" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>← Шпаргалки</Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 0 0` }}>Level {level.number}</h1>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
        {level.sheets.map((sheet) => (
          <div key={sheet.id} style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.md, boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)' }}>
            <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: `${spacing.xs} ${spacing.xs} 0 ${spacing.xs}` }}>{sheet.title}</h3>
            <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `${spacing.sm} ${spacing.xs} ${spacing.md} ${spacing.xs}` }}>{sheet.subtitle}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sheet.src} alt={sheet.title} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
