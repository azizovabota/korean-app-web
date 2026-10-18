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
    if (score >= 140) return '#10B981'; // green
    if (score >= 80) return '#F59E0B'; // amber
    return '#EF4444'; // red
  };

  const getLevelDescription = () => {
    if (level === '1급') return 'Отличный уровень! Начните продвинутый курс.';
    if (level === '2급') return 'Средний уровень. Нужна регулярная практика.';
    return 'Начальный уровень. Начните с основ.';
  };

  const scoreColor = getScoreColor();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      {/* Header */}
      <div
        style={{
          background: colors.gradient,
          color: colors.white,
          padding: `${spacing.xl} ${spacing.lg}`,
          borderRadius: '0 0 24px 24px',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: 0 }}>
              Результаты диагностики
            </h1>
            <div style={{ fontSize: '40px' }}>🎉</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {/* Score Card */}
        <div
          style={{
            backgroundColor: colors.white,
            borderRadius: '16px',
            padding: spacing.xl,
            marginBottom: spacing.lg,
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0, 180, 216, 0.15)',
            borderTop: `6px solid ${scoreColor}`,
          }}
        >
          <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, marginBottom: spacing.md }}>
            Прогнозируемый балл
          </p>
          <p style={{ fontSize: '60px', fontWeight: 'bold', color: scoreColor, margin: 0 }}>
            {score}
          </p>
          <p style={{ fontSize: typography.sizes.base, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
            / 200
          </p>
        </div>

        {/* Level Badge */}
        <div
          style={{
            backgroundColor: scoreColor + '20',
            border: `2px solid ${scoreColor}`,
            borderRadius: '16px',
            padding: spacing.lg,
            marginBottom: spacing.xl,
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', color: scoreColor, margin: 0 }}>
            {level}
          </p>
          <p style={{ fontSize: typography.sizes.base, color: colors.black, marginTop: spacing.md }}>
            {getLevelDescription()}
          </p>
        </div>

        {/* Recommendations */}
        <div
          style={{
            backgroundColor: colors.white,
            borderRadius: '16px',
            padding: spacing.lg,
            marginBottom: spacing.xl,
            boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)',
          }}
        >
          <h3 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, marginBottom: spacing.lg }}>
            📚 Следующие шаги
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
            {[
              { icon: '1️⃣', text: level === '1급' ? 'Изучение продвинутой грамматики и выражений' : level === '2급' ? 'Разговорная практика и развитие чтения' : 'Изучение базовой грамматики и лексики' },
              { icon: '2️⃣', text: 'Целевая практика слабых тем' },
              { icon: '3️⃣', text: 'Занятия 3–4 раза в неделю' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: spacing.md, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <p style={{ fontSize: typography.sizes.base, color: colors.black, margin: 0, lineHeight: '1.5' }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: spacing.lg,
            marginBottom: spacing.xl,
          }}
        >
          {[
            { label: 'Верных ответов', value: Math.floor(score / 20) },
            { label: 'Прогнозируемый уровень', value: level },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: colors.white,
                borderRadius: '12px',
                padding: spacing.lg,
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              }}
            >
              <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0, marginBottom: spacing.sm }}>
                {stat.label}
              </p>
              <p style={{ fontSize: typography.sizes.xl, fontWeight: 'bold', color: colors.primary, margin: 0 }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          <button
            onClick={onRetakeDiagnostic}
            style={{
              width: '100%',
              background: colors.gradient,
              color: colors.white,
              border: 'none',
              borderRadius: '12px',
              padding: spacing.lg,
              fontSize: typography.sizes.base,
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Пройти диагностику снова
          </button>

          <Link href="/">
            <button
              style={{
                width: '100%',
                backgroundColor: colors.white,
                color: colors.black,
                border: `2px solid ${colors.gray}`,
                borderRadius: '12px',
                padding: spacing.lg,
                fontSize: typography.sizes.base,
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              🏠 На главную
            </button>
          </Link>
        </div>

        {/* Tips */}
        <div
          style={{
            marginTop: spacing.xl,
            backgroundColor: '#FEF3C7',
            borderRadius: '12px',
            padding: spacing.lg,
            borderLeft: `4px solid ${colors.accent}`,
          }}
        >
          <p style={{ fontSize: typography.sizes.sm, color: colors.black, margin: 0, lineHeight: '1.5' }}>
            💡 <strong>Совет:</strong> Регулярные занятия и практика помогут поднять ваш уровень!
          </p>
        </div>
      </div>
    </div>
  );
}
