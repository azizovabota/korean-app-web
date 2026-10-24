'use client';

import { useState } from 'react';
import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';

interface LessonCard {
  id: string;
  title: string;
  korean: string;
  icon: string;
  href?: string;
}

interface LessonSection {
  id: string;
  title: string;
  cards: LessonCard[];
}

const sections: LessonSection[] = [
  {
    id: 'topik',
    title: 'Topik',
    cards: [
      { id: 'listening', title: '듣기', korean: 'Понимание на слух', icon: '🎧', href: '/listening' },
      { id: 'reading', title: '읽기', korean: 'Понимание текста', icon: '📖', href: '/topik/beginner' },
      { id: 'writing', title: '쓰기', korean: 'Практика письма', icon: '✍️' },
    ],
  },
  {
    id: 'ci',
    title: 'CI',
    cards: [
      { id: 'ci-beginner', title: 'Начальный', korean: 'Начальный', icon: '🌱', href: '/ci/beginner' },
      { id: 'ci-intermediate', title: 'Средний', korean: 'Средний', icon: '🌿', href: '/ci/intermediate' },
      { id: 'ci-advanced', title: 'Продвинутый', korean: 'Продвинутый', icon: '🌳', href: '/ci/advanced' },
    ],
  },
  {
    id: 'vocabulary',
    title: 'Практика слов',
    cards: [
      { id: 'cheatsheets', title: 'Шпаргалки', korean: '요약 정리', icon: '📝', href: '/cheatsheets' },
    ],
  },
];

const navItems = [
  { icon: '🏠', label: 'Главная', href: '/' },
  { icon: '❓', label: 'Уроки', href: '/questions', active: true },
  { icon: '📚', label: 'Моё обучение', href: '/my-study' },
  { icon: '📊', label: 'Анализ', href: '/analysis' },
];

const startButtonStyle = {
  width: '100%',
  background: colors.gradient,
  color: colors.white,
  border: 'none',
  borderRadius: '8px',
  padding: spacing.md,
  fontSize: typography.sizes.sm,
  fontWeight: '600',
  cursor: 'pointer',
};

export default function LessonPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '100px' }}>
      <div
        style={{
          background: colors.gradient,
          color: colors.white,
          padding: `${spacing.xl} ${spacing.lg}`,
          borderRadius: '0 0 24px 24px',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: 0, marginBottom: spacing.sm }}>
              Lesson
            </h1>
            <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: 0 }}>
              Обучение
            </p>
          </div>
          <div style={{ fontSize: '40px' }}>❓</div>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: `${spacing.xl} ${spacing.lg} 0` }}>
        {sections.map((section) => {
          const isOpen = openId === section.id;
          return (
            <div key={section.id} style={{ marginBottom: spacing.lg }}>
              <button
                onClick={() => setOpenId(isOpen ? null : section.id)}
                style={{
                  width: '100%',
                  backgroundColor: colors.white,
                  borderRadius: '16px',
                  padding: spacing.lg,
                  border: `2px solid ${isOpen ? colors.primary : 'transparent'}`,
                  boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: typography.sizes.lg,
                  fontWeight: 'bold',
                  color: colors.black,
                  cursor: 'pointer',
                }}
              >
                {section.title}
                <span style={{ color: colors.primary }}>{isOpen ? '▾' : '▸'}</span>
              </button>

              {isOpen && (
                <div style={{ marginTop: spacing.md, paddingLeft: spacing.md }}>
                  {section.cards.length === 0 && (
                    <div
                      style={{
                        backgroundColor: colors.white,
                        borderRadius: '16px',
                        padding: spacing.lg,
                        color: colors.darkGray,
                        fontSize: typography.sizes.sm,
                      }}
                    >
                      Скоро появится
                    </div>
                  )}

                  {section.cards.map((card) => (
                    <div
                      key={card.id}
                      style={{
                        backgroundColor: colors.white,
                        borderRadius: '16px',
                        padding: spacing.lg,
                        marginBottom: spacing.md,
                        boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.lg }}>
                        <div style={{ fontSize: '32px' }}>{card.icon}</div>
                        <div>
                          <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>
                            {card.title}
                          </h3>
                          <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                            {card.korean}
                          </p>
                        </div>
                      </div>

                      {card.href ? (
                        <Link href={card.href} style={{ display: 'block' }}>
                          <button style={startButtonStyle}>Начать →</button>
                        </Link>
                      ) : (
                        <button style={startButtonStyle}>Начать →</button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

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
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <div
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                color: item.active ? colors.primary : colors.darkGray,
              }}
            >
              <p style={{ fontSize: '24px', margin: `0 0 ${spacing.xs} 0` }}>{item.icon}</p>
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
