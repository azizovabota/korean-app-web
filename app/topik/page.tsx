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
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      {/* Header с градиентом */}
      <div
        style={{
          background: colors.gradient,
          color: colors.white,
          padding: `${spacing.xl} ${spacing.lg}`,
          borderRadius: '0 0 24px 24px',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl }}>
            <div>
              <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: 0, marginBottom: spacing.sm }}>
                TOPIK 준비
              </h1>
              <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: 0 }}>
                한국어 능력 평가 시험 준비
              </p>
            </div>
            <div style={{ fontSize: '40px' }}>🎯</div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: spacing.md }}>
            <Link href="/">
              <button
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: colors.white,
                  border: 'none',
                  borderRadius: '12px',
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
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {/* Menu Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
          {/* Quick Diagnostic */}
          <div
            onClick={handleStartDiagnostic}
            style={{
              backgroundColor: colors.white,
              borderRadius: '16px',
              padding: spacing.lg,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: `2px solid ${colors.primary}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(124, 58, 237, 0.2)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.1)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.lg }}>
              <div style={{ fontSize: '40px' }}>🔍</div>
              <div>
                <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, margin: 0 }}>
                  빠른 진단
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                  Quick Diagnostic
                </p>
              </div>
            </div>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, lineHeight: '1.5', margin: 0 }}>
              5분 안에 당신의 한국어 수준을 빠르게 진단하세요
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleStartDiagnostic();
              }}
              style={{
                marginTop: spacing.lg,
                width: '100%',
                background: colors.gradient,
                color: colors.white,
                border: 'none',
                borderRadius: '12px',
                padding: spacing.md,
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              시작하기 →
            </button>
          </div>

          {/* Full Diagnostic - Coming Soon */}
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: '16px',
              padding: spacing.lg,
              opacity: 0.6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.lg }}>
              <div style={{ fontSize: '40px' }}>📊</div>
              <div>
                <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, margin: 0 }}>
                  상세 진단
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                  Full Diagnostic
                </p>
              </div>
            </div>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, lineHeight: '1.5', margin: 0 }}>
              20분간 완전한 모의고사로 정확한 점수를 예측하세요
            </p>
            <div
              style={{
                marginTop: spacing.lg,
                display: 'inline-block',
                backgroundColor: '#F3E8FF',
                color: colors.primary,
                borderRadius: '8px',
                padding: `${spacing.sm} ${spacing.lg}`,
                fontSize: typography.sizes.sm,
                fontWeight: 'bold',
              }}
            >
              추후 출시
            </div>
          </div>

          {/* Targeted Practice - Coming Soon */}
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: '16px',
              padding: spacing.lg,
              opacity: 0.6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.lg }}>
              <div style={{ fontSize: '40px' }}>📝</div>
              <div>
                <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, margin: 0 }}>
                  목표 달성 연습
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                  Targeted Practice
                </p>
              </div>
            </div>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, lineHeight: '1.5', margin: 0 }}>
              약한 부분에 집중하여 체계적으로 학습하세요
            </p>
            <div
              style={{
                marginTop: spacing.lg,
                display: 'inline-block',
                backgroundColor: '#F3E8FF',
                color: colors.primary,
                borderRadius: '8px',
                padding: `${spacing.sm} ${spacing.lg}`,
                fontSize: typography.sizes.sm,
                fontWeight: 'bold',
              }}
            >
              추후 출시
            </div>
          </div>

          {/* Mock Exam - Coming Soon */}
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: '16px',
              padding: spacing.lg,
              opacity: 0.6,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.lg }}>
              <div style={{ fontSize: '40px' }}>⏱️</div>
              <div>
                <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, margin: 0 }}>
                  모의 시험
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                  Mock Exam
                </p>
              </div>
            </div>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, lineHeight: '1.5', margin: 0 }}>
              실제 시험처럼 시간 제한 하에 문제를 풀어보세요
            </p>
            <div
              style={{
                marginTop: spacing.lg,
                display: 'inline-block',
                backgroundColor: '#F3E8FF',
                color: colors.primary,
                borderRadius: '8px',
                padding: `${spacing.sm} ${spacing.lg}`,
                fontSize: typography.sizes.sm,
                fontWeight: 'bold',
              }}
            >
              추후 출시
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div
          style={{
            marginTop: spacing.xl,
            backgroundColor: '#F3E8FF',
            borderRadius: '12px',
            padding: spacing.lg,
            borderLeft: `4px solid ${colors.primary}`,
          }}
        >
          <p style={{ fontSize: typography.sizes.sm, color: colors.black, margin: 0, lineHeight: '1.5' }}>
            💡 <strong>팁:</strong> 진단을 통해 당신의 한국어 수준을 파악하고 맞춤형 학습 계획을 세우세요.
          </p>
        </div>
      </div>
    </div>
  );
}
