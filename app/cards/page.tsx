'use client';

import { useState } from 'react';
import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';
import { WORD_LEVELS, folderCategoryId } from '@/lib/wordCards';

// Папки одинаковые на обоих уровнях, поэтому берём их из первого
const folders = WORD_LEVELS[0].categories;

export default function WordFoldersPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/questions" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>← Практика слов</Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 0 0` }}>Карточки</h1>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {folders.map((folder) => {
          const isOpen = openId === folder.id;
          return (
            <div key={folder.id} style={{ backgroundColor: colors.white, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)', overflow: 'hidden' }}>
              <button
                onClick={() => setOpenId(isOpen ? null : folder.id)}
                style={{ width: '100%', background: 'none', border: 'none', padding: spacing.lg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                  <div style={{ fontSize: '32px' }}>{folder.icon}</div>
                  <div>
                    <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>{folder.title}</h3>
                    <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>{folder.subtitle}</p>
                  </div>
                </div>
                <span style={{ fontSize: typography.sizes.lg, color: colors.primary }}>{isOpen ? '▾' : '▸'}</span>
              </button>

              {isOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm, padding: `0 ${spacing.lg} ${spacing.lg} ${spacing.lg}` }}>
                  {WORD_LEVELS.map((level) => {
                    const category = level.categories.find((item) => item.id === folderCategoryId(folder.id, level.id));
                    if (!category) {
                      return (
                        <div key={level.id} style={{ borderRadius: '12px', padding: spacing.md, backgroundColor: colors.lightGray, color: colors.darkGray, fontSize: typography.sizes.sm }}>
                          {level.title}: скоро появится
                        </div>
                      );
                    }
                    return (
                      <Link key={level.id} href={`/cards/${folder.id}/${level.id}`} style={{ textDecoration: 'none' }}>
                        <div style={{ borderRadius: '12px', padding: spacing.md, backgroundColor: colors.lightGray, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <p style={{ fontSize: typography.sizes.base, fontWeight: '600', color: colors.black, margin: 0 }}>{level.title}</p>
                            <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `${spacing.xs} 0 0 0` }}>Слов: {category.words.length}</p>
                          </div>
                          <span style={{ fontSize: typography.sizes.lg, color: colors.primary }}>→</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
