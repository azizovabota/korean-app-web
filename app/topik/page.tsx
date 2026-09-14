'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TopikQuickDiagnostic } from '@/components/TopikQuickDiagnostic';
import { TopikResultScreen } from '@/components/TopikResultScreen';
import { colors, typography, spacing } from '@/constants/colors';

type Screen = 'menu' | 'diagnostic' | 'result';

interface Result {
  score: number;
  level: string;
}

const userId = 'test-user-001';

export default function TopikPage() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [result, setResult] = useState<Result | null>(null);

  const handleStartDiagnostic = () => {
    setScreen('diagnostic');
  };

  const handleDiagnosticComplete = (score: number, level: string) => {
    setResult({ score, level });
    setScreen('result');
  };

  const handleRetakeDiagnostic = () => {
    setResult(null);
    setScreen('diagnostic');
  };

  const handleBackToHome = () => {
    setScreen('menu');
    setResult(null);
  };

  if (screen === 'diagnostic') {
    return <TopikQuickDiagnostic userId={userId} onComplete={handleDiagnosticComplete} />;
  }

  if (screen === 'result' && result) {
    return (
      <TopikResultScreen
        score={result.score}
        level={result.level}
        onRetakeDiagnostic={handleRetakeDiagnostic}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, padding: spacing.lg }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: spacing.lg, display: 'flex', gap: spacing.md }}>
          <button
            onClick={() => window.history.back()}
            style={{
              backgroundColor: colors.lightGray,
              color: colors.black,
              border: `1px solid ${colors.gray}`,
              borderRadius: '8px',
              padding: `${spacing.sm} ${spacing.lg}`,
              fontSize: typography.sizes.sm,
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            ← Назад
          </button>
          <Link href="/">
            <button
              style={{
                backgroundColor: colors.lightGray,
                color: colors.black,
                border: `1px solid ${colors.gray}`,
                borderRadius: '8px',
                padding: `${spacing.sm} ${spacing.lg}`,
                fontSize: typography.sizes.sm,
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              🏠 Домой
            </button>
          </Link>
        </div>
        <div style={{ marginBottom: spacing.xl, textAlign: 'center' }}>
          <h1
            style={{
              fontSize: typography.sizes['2xl'],
              fontWeight: 'bold',
              color: colors.black,
              marginBottom: spacing.xs,
            }}
          >
            TOPIK 준비
          </h1>
          <p style={{ fontSize: typography.sizes.base, color: colors.darkGray }}>
            한국어 능력 평가 시험 준비
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md, marginBottom: spacing.xl }}>
          <div
            onClick={handleStartDiagnostic}
            style={{
              backgroundColor: colors.white,
              borderRadius: '12px',
              padding: spacing.lg,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            <p style={{ fontSize: '40px', marginBottom: spacing.md }}>🔍</p>
            <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black }}>
              빠른 진단
            </h3>
            <p
              style={{
                fontSize: typography.sizes.sm,
                color: colors.darkGray,
                marginTop: spacing.md,
                lineHeight: '1.5',
              }}
            >
              5분 안에 당신의 한국어 수준을 빠르게 진단하세요
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStartDiagnostic();
              }}
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none',
                borderRadius: '8px',
                padding: `${spacing.sm} ${spacing.lg}`,
                fontSize: typography.sizes.sm,
                fontWeight: '600',
                cursor: 'pointer',
                marginTop: spacing.lg,
              }}
            >
              시작하기
            </button>
          </div>

          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: '12px',
              padding: spacing.lg,
              textAlign: 'center',
              opacity: 0.6,
            }}
          >
            <p style={{ fontSize: '40px', marginBottom: spacing.md }}>📊</p>
            <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black }}>
              상세 진단
            </h3>
            <p
              style={{
                fontSize: typography.sizes.sm,
                color: colors.darkGray,
                marginTop: spacing.md,
                lineHeight: '1.5',
              }}
            >
              20분간 완전한 모의고사로 정확한 점수를 예측하세요
            </p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, marginTop: spacing.lg }}>
              추후 출시
            </p>
          </div>

          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: '12px',
              padding: spacing.lg,
              textAlign: 'center',
              opacity: 0.6,
            }}
          >
            <p style={{ fontSize: '40px', marginBottom: spacing.md }}>📝</p>
            <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black }}>
              목표 달성 연습
            </h3>
            <p
              style={{
                fontSize: typography.sizes.sm,
                color: colors.darkGray,
                marginTop: spacing.md,
                lineHeight: '1.5',
              }}
            >
              약한 부분에 집중하여 체계적으로 학습하세요
            </p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, marginTop: spacing.lg }}>
              추후 출시
            </p>
          </div>

          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: '12px',
              padding: spacing.lg,
              textAlign: 'center',
              opacity: 0.6,
            }}
          >
            <p style={{ fontSize: '40px', marginBottom: spacing.md }}>⏱️</p>
            <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black }}>
              모의 시험
            </h3>
            <p
              style={{
                fontSize: typography.sizes.sm,
                color: colors.darkGray,
                marginTop: spacing.md,
                lineHeight: '1.5',
              }}
            >
              실제 시험처럼 시간 제한 하에 문제를 풀어보세요
            </p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, marginTop: spacing.lg }}>
              추후 출시
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFF9E6',
            borderRadius: '8px',
            padding: spacing.md,
            borderLeft: `4px solid ${colors.accent}`,
            marginBottom: spacing.lg,
          }}
        >
          <p style={{ fontSize: typography.sizes.sm, color: colors.black }}>
            💡 팁: 진단을 통해 당신의 한국어 수준을 파악하고 맞춤형 학습 계획을 세우세요.
          </p>
        </div>

        <Link href="/">
          <button
            style={{
              width: '100%',
              backgroundColor: colors.lightGray,
              color: colors.black,
              border: `1px solid ${colors.gray}`,
              borderRadius: '8px',
              padding: `${spacing.md} ${spacing.lg}`,
              fontSize: typography.sizes.base,
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            ← 홈으로
          </button>
        </Link>
      </div>
    </div>
  );
}
