'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import { WORD_LEVELS, folderCategoryId } from '@/lib/wordCards';

export default function WordFolderPage() {
  const params = useParams();
  const folderId = String(params.category);
  const folderTitle = WORD_LEVELS[0].categories.find((category) => category.id === folderId);

  if (!folderTitle) {
    return <p style={{ padding: spacing.lg }}>Папка не найдена</p>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/cards" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>← Карточки</Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 0 0` }}>{folderTitle.title}</h1>
          <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: `${spacing.sm} 0 0 0` }}>{folderTitle.subtitle}</p>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.xl }}>
        {WORD_LEVELS.map((level) => {
          const category = level.categories.find((item) => item.id === folderCategoryId(folderId, level.id));
          return (
            <section key={level.id} style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
              <h2 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, margin: 0 }}>{level.title}</h2>
              {category ? (
                <Link href={`/cards/${folderId}/${level.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)' }}>
                    <p style={{ fontSize: typography.sizes.base, fontWeight: '600', color: colors.black, margin: 0 }}>
                      Слов: {category.words.length}
                    </p>
                    <span style={{ fontSize: typography.sizes.lg, color: colors.primary }}>→</span>
                  </div>
                </Link>
              ) : (
                <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, color: colors.darkGray, fontSize: typography.sizes.sm }}>
                  Скоро появится
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
