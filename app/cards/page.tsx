'use client';

import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';
import { WORD_CATEGORIES } from '@/lib/wordCards';

export default function WordCategoriesPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/questions" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>← Практика слов</Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 0 0` }}>Карточки</h1>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {WORD_CATEGORIES.length === 0 && (
          <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, color: colors.darkGray, fontSize: typography.sizes.sm }}>
            Скоро появится
          </div>
        )}

        {WORD_CATEGORIES.map((category) => (
          <Link key={category.id} href={`/cards/${category.id}/1`} style={{ textDecoration: 'none' }}>
            <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                <div style={{ fontSize: '32px' }}>{category.icon}</div>
                <div>
                  <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>{category.title}</h3>
                  <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                    {category.subtitle} · слов: {category.words.length}
                  </p>
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
