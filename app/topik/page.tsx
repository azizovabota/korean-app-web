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
                Подготовка к TOPIK
              </h1>
              <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: 0 }}>
                Подготовка к экзамену по корейскому
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
          {/* Экспресс-проверка */}
          <div
            onClick={handleStartDiagnostic}
            style={{
              backgroundColor: colors.white,
              borderRadius: '16px',
              padding: spacing.lg,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              border: `2px solid ${colors.primary}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(0, 180, 216, 0.2)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 12px rgba(0, 180, 216, 0.1)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.lg }}>
              <div style={{ fontSize: '40px' }}>🔍</div>
              <div>
                <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, margin: 0 }}>
                  Быстрая диагностика
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                  Экспресс-проверка
                </p>
              </div>
            </div>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, lineHeight: '1.5', margin: 0 }}>
              Быстро определите свой уровень за 5 минут
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
              Начать →
            </button>
          </div>

          {/* TOPIK Beginner 1/2 */}
          <Link href="/topik/beginner" style={{ textDecoration: 'none' }}>
            <div
              style={{
                backgroundColor: colors.white,
                borderRadius: '16px',
                padding: spacing.lg,
                boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)',
                border: `2px solid ${colors.primary}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
                <div style={{ fontSize: '40px' }}>📘</div>
                <div>
                  <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, margin: 0 }}>
                    TOPIK Beginner 1/2
                  </h3>
                  <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                    Reading Lesson 1–8 · тест с разбором
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Полная проверка - Coming Soon */}
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
                  Подробная диагностика
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                  Полная проверка
                </p>
              </div>
            </div>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, lineHeight: '1.5', margin: 0 }}>
              Полный пробный экзамен за 20 минут для точного прогноза балла
            </p>
            <div
              style={{
                marginTop: spacing.lg,
                display: 'inline-block',
                backgroundColor: '#E0F7FA',
                color: colors.primary,
                borderRadius: '8px',
                padding: `${spacing.sm} ${spacing.lg}`,
                fontSize: typography.sizes.sm,
                fontWeight: 'bold',
              }}
            >
              Скоро
            </div>
          </div>

          {/* Целевая практика - Coming Soon */}
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
                  Тренировка для цели
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                  Целевая практика
                </p>
              </div>
            </div>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, lineHeight: '1.5', margin: 0 }}>
              Систематически занимайтесь слабыми темами
            </p>
            <div
              style={{
                marginTop: spacing.lg,
                display: 'inline-block',
                backgroundColor: '#E0F7FA',
                color: colors.primary,
                borderRadius: '8px',
                padding: `${spacing.sm} ${spacing.lg}`,
                fontSize: typography.sizes.sm,
                fontWeight: 'bold',
              }}
            >
              Скоро
            </div>
          </div>

          {/* Пробный тест - Coming Soon */}
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
                  Пробный экзамен
                </h3>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                  Пробный тест
                </p>
              </div>
            </div>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, lineHeight: '1.5', margin: 0 }}>
              Решайте задания с ограничением по времени, как на настоящем экзамене
            </p>
            <div
              style={{
                marginTop: spacing.lg,
                display: 'inline-block',
                backgroundColor: '#E0F7FA',
                color: colors.primary,
                borderRadius: '8px',
                padding: `${spacing.sm} ${spacing.lg}`,
                fontSize: typography.sizes.sm,
                fontWeight: 'bold',
              }}
            >
              Скоро
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div
          style={{
            marginTop: spacing.xl,
            backgroundColor: '#E0F7FA',
            borderRadius: '12px',
            padding: spacing.lg,
            borderLeft: `4px solid ${colors.primary}`,
          }}
        >
          <p style={{ fontSize: typography.sizes.sm, color: colors.black, margin: 0, lineHeight: '1.5' }}>
            💡 <strong>Совет:</strong> Диагностика покажет ваш уровень и поможет составить план обучения.
          </p>
        </div>
      </div>
    </div>
  );
}
