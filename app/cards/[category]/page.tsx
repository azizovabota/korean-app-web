'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import { CARDS_PER_SESSION, countSessions, getWordCategory } from '@/lib/wordCards';

export default function WordCategoryPage() {
  const params = useParams();
  const category = getWordCategory(String(params.category));

  if (!category) {
    return <p style={{ padding: spacing.lg }}>Папка не найдена</p>;
  }

  const sessions = countSessions(category);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/cards" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>← Карточки</Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 0 0` }}>{category.title}</h1>
          <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: `${spacing.sm} 0 0 0` }}>{category.subtitle}</p>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {Array.from({ length: sessions }, (_, i) => {
          const session = i + 1;
          const from = i * CARDS_PER_SESSION + 1;
          const to = Math.min((i + 1) * CARDS_PER_SESSION, category.words.length);
          return (
            <Link key={session} href={`/cards/${category.id}/${session}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)', color: colors.black, fontWeight: '600' }}>
                Слова {from}–{to}
              </div>
            </Link>
          );
        })}
        {sessions === 0 && (
          <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, color: colors.darkGray, fontSize: typography.sizes.sm }}>
            Скоро появится
          </div>
        )}
      </div>
    </div>
  );
}
