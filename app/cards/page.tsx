'use client';

import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';
import { WORD_LEVELS } from '@/lib/wordCards';

// Папки одинаковые на обоих уровнях, поэтому берём их из первого
const folders = WORD_LEVELS[0].categories;

export default function WordFoldersPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/questions" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>← Практика слов</Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 0 0` }}>Карточки</h1>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {folders.map((folder) => (
          <Link key={folder.id} href={`/cards/${folder.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                <div style={{ fontSize: '32px' }}>{folder.icon}</div>
                <div>
                  <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>{folder.title}</h3>
                  <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>{folder.subtitle}</p>
                </div>
              </div>
              <span style={{ fontSize: typography.sizes.lg, color: colors.primary }}>→</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
