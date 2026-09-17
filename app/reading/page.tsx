'use client';

import Link from 'next/link';
import { useState } from 'react';
import { colors, typography, spacing } from '@/constants/colors';
import { readingLessons } from '@/data/readingLessons';

export default function ReadingLessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

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
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.xl }}>
            <Link href="/questions">
              <button
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.white,
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                ‹
              </button>
            </Link>
            <div>
              <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: 0, marginBottom: spacing.sm }}>
                Reading
              </h1>
              <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: 0 }}>
                읽기 이해
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {/* Info Box */}
        <div
          style={{
            backgroundColor: '#F3E8FF',
            borderRadius: '12px',
            padding: spacing.lg,
            marginBottom: spacing.xl,
            borderLeft: `4px solid ${colors.primary}`,
          }}
        >
          <p style={{ fontSize: typography.sizes.sm, color: colors.black, margin: 0, lineHeight: '1.5' }}>
            💡 각 레슨에서 문법 → 단어 → 테스트 순서로 학습하세요!
          </p>
        </div>

        {/* Lessons Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg }}>
          {readingLessons.map((lesson) => (
            <Link key={lesson.id} href={`/reading/${lesson.id}`}>
              <div
                style={{
                  backgroundColor: colors.white,
                  borderRadius: '16px',
                  padding: spacing.lg,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  border: `2px solid transparent`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(124, 58, 237, 0.2)';
                  (e.currentTarget as HTMLElement).style.borderColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: spacing.md }}>📖</div>
                <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0, marginBottom: spacing.sm }}>
                  {lesson.title.split(':')[1]?.trim() || lesson.title}
                </h3>
                <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: 0, lineHeight: '1.4' }}>
                  {lesson.description}
                </p>
                <div
                  style={{
                    marginTop: spacing.lg,
                    display: 'inline-block',
                    backgroundColor: '#F3E8FF',
                    color: colors.primary,
                    borderRadius: '8px',
                    padding: `${spacing.xs} ${spacing.lg}`,
                    fontSize: typography.sizes.xs,
                    fontWeight: 'bold',
                  }}
                >
                  {lesson.level}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Tips Box */}
        <div
          style={{
            backgroundColor: colors.white,
            borderRadius: '12px',
            padding: spacing.lg,
            marginTop: spacing.xl,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <h4 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0, marginBottom: spacing.md }}>
            📚 학습 순서
          </h4>
          <ol style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0, paddingLeft: spacing.lg, lineHeight: '1.8' }}>
            <li>먼저 <strong>문법(Grammar)</strong> 을/를 학습하세요</li>
            <li>다음 <strong>단어(Vocabulary)</strong> 를 익히세요</li>
            <li>마지막으로 <strong>테스트(Test)</strong> 를 풀어보세요</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
