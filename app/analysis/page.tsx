'use client';

import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';

interface UserStats {
  totalScore: number;
  level: string;
  userName: string;
  correctCount: number;
  totalQuestions: number;
  lastUpdated: string;
}

export default function AnalysisPage() {
  const stats: UserStats = {
    totalScore: 0,
    level: 'LV.0',
    userName: 'Привет, Akbota Azizova,',
    correctCount: 0,
    totalQuestions: 0,
    lastUpdated: 'Никогда',
  };

  const getScorePercentage = () => {
    if (stats.totalQuestions === 0) return 0;
    return (stats.correctCount / stats.totalQuestions) * 100;
  };

  const scorePercentage = getScorePercentage();
  const scoreColor = stats.totalScore >= 140 ? '#10B981' : stats.totalScore >= 80 ? '#F59E0B' : '#00B4D8';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '100px' }}>
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
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: 0, marginBottom: spacing.sm }}>
            Analysis
          </h1>
          <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: 0 }}>
            Анализ
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {/* Total Score Card */}
        <div
          style={{
            backgroundColor: colors.white,
            borderRadius: '16px',
            padding: spacing.xl,
            marginBottom: spacing.xl,
            boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)',
          }}
        >
          <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0, marginBottom: spacing.xl }}>
            Общий балл
          </h3>

          {/* Circular Progress Chart */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: spacing.xl, position: 'relative', height: '240px' }}>
            {/* Outer Circle */}
            <div
              style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: `conic-gradient(${scoreColor} 0%, ${scoreColor} ${scorePercentage}%, ${colors.gray} ${scorePercentage}%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Inner Circle */}
              <div
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  backgroundColor: colors.white,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p style={{ fontSize: typography.sizes['3xl'], fontWeight: 'bold', color: scoreColor, margin: 0 }}>
                  {stats.totalScore}
                </p>
                <p style={{ fontSize: typography.sizes.sm, color: colors.primary, margin: `${spacing.sm} 0 0 0` }}>
                  Цель 0
                </p>
              </div>
            </div>

            {/* Label Tooltip */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#2D3436',
                color: colors.white,
                padding: `${spacing.sm} ${spacing.lg}`,
                borderRadius: '16px',
                fontSize: typography.sizes.sm,
                fontWeight: '600',
                whiteSpace: 'nowrap',
              }}
            >
              Чтение {stats.correctCount}
            </div>
          </div>

          {/* User Level Card */}
          <div
            style={{
              backgroundColor: '#E0F7FA',
              border: `2px solid ${colors.primary}`,
              borderRadius: '12px',
              padding: spacing.lg,
              marginBottom: spacing.lg,
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0, marginBottom: spacing.sm }}>
              {stats.level}
            </p>
            <p style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>
              {stats.userName}
            </p>
          </div>

          {/* Get Precise Analysis Button */}
          <button
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
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
            }}
          >
            Подробный анализ &gt;
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg, marginBottom: spacing.xl }}>
          {[
            { label: 'Правильных ответов', value: stats.correctCount },
            { label: 'Всего вопросов', value: stats.totalQuestions },
            { label: 'Точность', value: stats.totalQuestions > 0 ? `${Math.round(scorePercentage)}%` : '0%' },
            { label: 'Обновлено', value: stats.lastUpdated },
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
              <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: 0, marginBottom: spacing.sm }}>
                {stat.label}
              </p>
              <p style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.primary, margin: 0 }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div
          style={{
            backgroundColor: '#E0F7FA',
            borderRadius: '12px',
            padding: spacing.lg,
            borderLeft: `4px solid ${colors.primary}`,
            marginBottom: spacing.xl,
          }}
        >
          <p style={{ fontSize: typography.sizes.sm, color: colors.black, margin: 0, lineHeight: '1.5' }}>
            💡 <strong>Совет:</strong> Решайте больше вопросов и анализируйте результаты!
          </p>
        </div>

        {/* Call to Action */}
        <Link href="/questions">
          <button
            style={{
              width: '100%',
              backgroundColor: colors.white,
              color: colors.black,
              border: `2px solid ${colors.primary}`,
              borderRadius: '12px',
              padding: spacing.lg,
              fontSize: typography.sizes.base,
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Начать → перейти в банк вопросов
          </button>
        </Link>
      </div>

      {/* Floating Play Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: colors.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 180, 216, 0.3)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        }}
      >
        <span style={{ fontSize: '28px' }}>▶</span>
      </div>

      {/* Bottom Navigation */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.white,
          borderTop: `1px solid ${colors.gray}`,
          display: 'flex',
          justifyContent: 'space-around',
          padding: `${spacing.md} 0`,
          maxWidth: '600px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {[
          { icon: '🏠', label: 'Главная', href: '/' },
          { icon: '❓', label: 'Уроки', href: '/questions' },
          { icon: '📚', label: 'Моё обучение', href: '/my-study' },
          { icon: '📊', label: 'Анализ', href: '/analysis', active: true },
        ].map((item) => (
          <Link key={item.label} href={item.href}>
            <div
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                color: item.active ? colors.primary : colors.darkGray,
              }}
            >
              <p style={{ fontSize: '24px', margin: `0 0 ${spacing.xs} 0` }}>
                {item.icon}
              </p>
              <p style={{ fontSize: typography.sizes.xs, margin: 0, fontWeight: item.active ? 'bold' : 'normal' }}>
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
