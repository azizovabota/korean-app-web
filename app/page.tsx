'use client';

import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray }}>
      <div
        style={{
          padding: spacing.lg,
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <div style={{ marginBottom: spacing.xl, textAlign: 'center' }}>
          <h1
            style={{
              fontSize: typography.sizes['3xl'],
              fontWeight: 'bold',
              color: colors.black,
              marginBottom: spacing.xs,
            }}
          >
            Korean App
          </h1>
          <p style={{ fontSize: typography.sizes.base, color: colors.darkGray }}>
            한국어 학습 플랫폼
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, marginBottom: spacing.xl }}>
          <Link href="/topik">
            <div
              style={{
                backgroundColor: colors.white,
                borderRadius: '12px',
                padding: spacing.lg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, flex: 1 }}>
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    backgroundColor: colors.lightGray,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                  }}
                >
                  🎯
                </div>
                <div>
                  <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black }}>
                    TOPIK
                  </h3>
                  <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray }}>
                    시험 준비 및 진단
                  </p>
                </div>
              </div>
              <span style={{ fontSize: typography.sizes.lg, color: colors.primary }}>→</span>
            </div>
          </Link>

          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: '12px',
              padding: spacing.lg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: 0.6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, flex: 1 }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  backgroundColor: colors.lightGray,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                }}
              >
                🔤
              </div>
              <div>
                <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black }}>
                  Hangul
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray }}>
                  한글 배우기 (예정중)
                </p>
              </div>
            </div>
            <span style={{ fontSize: typography.sizes.sm, color: colors.darkGray }}>Coming Soon</span>
          </div>

          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: '12px',
              padding: spacing.lg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: 0.6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, flex: 1 }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  backgroundColor: colors.lightGray,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                }}
              >
                📚
              </div>
              <div>
                <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black }}>
                  Vocabulary
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray }}>
                  단어 학습 (예정중)
                </p>
              </div>
            </div>
            <span style={{ fontSize: typography.sizes.sm, color: colors.darkGray }}>Coming Soon</span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFF9E6',
            borderRadius: '8px',
            padding: spacing.md,
            borderLeft: `4px solid ${colors.accent}`,
          }}
        >
          <p style={{ fontSize: typography.sizes.sm, color: colors.black }}>
            💡 TOPIK 진단으로 당신의 한국어 수준을 빠르게 파악하세요!
          </p>
        </div>

        <div style={{ marginTop: spacing.xl, textAlign: 'center' }}>
          <Link href="/admin">
            <span style={{ fontSize: typography.sizes.xs, color: colors.darkGray, textDecoration: 'underline' }}>
              🔧 Admin Panel
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
