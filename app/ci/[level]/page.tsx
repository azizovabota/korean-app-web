'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import { ciLevels, ciMethods } from '@/lib/ciLevels';

export default function CiLevelPage() {
  const params = useParams();
  const level = String(params.level);
  const config = ciLevels[level];

  if (!config) {
    return <p style={{ padding: spacing.lg }}>Уровень не найден</p>;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/questions" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>
            ← Lesson
          </Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 0 0` }}>
            CI · {config.title}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
        {!config.hasData && (
          <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, color: colors.darkGray, fontSize: typography.sizes.sm }}>
            Скоро появится
          </div>
        )}

        {config.hasData &&
          Object.entries(ciMethods).map(([method, info]) => (
            <Link key={method} href={`/ci/${level}/${method}`} style={{ textDecoration: 'none' }}>
              <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)' }}>
                <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: `0 0 ${spacing.sm} 0` }}>
                  {info.title}
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0, lineHeight: '1.5' }}>
                  {info.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
