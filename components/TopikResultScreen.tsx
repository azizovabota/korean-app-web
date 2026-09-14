'use client';

import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';

interface TopikResultScreenProps {
  score: number;
  level: string;
  onRetakeDiagnostic: () => void;
  onBackToHome: () => void;
}

export function TopikResultScreen({
  score,
  level,
  onRetakeDiagnostic,
  onBackToHome,
}: TopikResultScreenProps) {
  const getScoreColor = () => {
    if (score >= 140) return '#10B981';
    if (score >= 80) return '#F59E0B';
    return '#EF4444';
  };

  const getLevelDescription = () => {
    if (level === '1급') return '뛰어난 수준입니다! 고급 과정을 시작하세요.';
    if (level === '2급') return '중급 수준입니다. 꾸준한 연습이 필요합니다.';
    return '초급 수준입니다. 기초부터 시작하세요.';
  };

  const scoreColor = getScoreColor();

  return (
    <div style={{ overflowY: 'auto', padding: spacing.lg, minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.lg, maxWidth: '600px', margin: '0 auto 24px' }}>
        <Link href="/topik">
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
            ← Меню
          </button>
        </Link>
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

      <div style={{ textAlign: 'center', marginBottom: spacing.xl, maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', color: colors.black }}>
          진단 결과
        </h1>
      </div>

      <div
        style={{
          backgroundColor: colors.white,
          borderRadius: '12px',
          padding: spacing.xl,
          marginBottom: spacing.lg,
          borderTop: `4px solid ${scoreColor}`,
          textAlign: 'center',
          boxShadow: colors.darkGray,
        }}
      >
        <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, marginBottom: spacing.sm }}>
          예상 점수
        </p>
        <p style={{ fontSize: '56px', fontWeight: 'bold', color: scoreColor }}>
          {score}
        </p>
        <p style={{ fontSize: typography.sizes.base, color: colors.darkGray }}>
          / 200
        </p>
      </div>

      <div
        style={{
          backgroundColor: scoreColor + '15',
          borderRadius: '12px',
          padding: spacing.lg,
          marginBottom: spacing.lg,
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.primary }}>
          {level}
        </p>
        <p style={{ fontSize: typography.sizes.base, color: colors.black, marginTop: spacing.sm }}>
          {getLevelDescription()}
        </p>
      </div>

      <div
        style={{
          backgroundColor: colors.white,
          borderRadius: '12px',
          padding: spacing.lg,
          marginBottom: spacing.lg,
        }}
      >
        <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black }}>
          📚 다음 단계
        </h3>

        <div style={{ marginTop: spacing.md }}>
          <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.md, alignItems: 'flex-start' }}>
            <span>1️⃣</span>
            <p style={{ fontSize: typography.sizes.sm, color: colors.black }}>
              {level === '1급'
                ? '고급 문법과 표현 학습'
                : level === '2급'
                ? '일상 회화와 읽기 능력 강화'
                : '기본 문법과 어휘 학습'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.md, alignItems: 'flex-start' }}>
            <span>2️⃣</span>
            <p style={{ fontSize: typography.sizes.sm, color: colors.black }}>
              약한 부분에 대한 집중 연습
            </p>
          </div>

          <div style={{ display: 'flex', gap: spacing.md, alignItems: 'flex-start' }}>
            <span>3️⃣</span>
            <p style={{ fontSize: typography.sizes.sm, color: colors.black }}>
              주 3-4회 정기적인 학습
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        <button
          onClick={onRetakeDiagnostic}
          style={{
            backgroundColor: colors.primary,
            color: colors.white,
            border: 'none',
            borderRadius: '8px',
            padding: `${spacing.md} ${spacing.lg}`,
            fontSize: typography.sizes.base,
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          다시 진단하기
        </button>

        <button
          onClick={onBackToHome}
          style={{
            backgroundColor: colors.lightGray,
            color: colors.black,
            border: 'none',
            borderRadius: '8px',
            padding: `${spacing.md} ${spacing.lg}`,
            fontSize: typography.sizes.base,
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          홈으로
        </button>
      </div>
    </div>
  );
}
