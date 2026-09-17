'use client';

import Link from 'next/link';
import { useState } from 'react';
import { colors, typography, spacing } from '@/constants/colors';
import { readingLessons } from '@/data/readingLessons';
import { useParams } from 'next/navigation';

export default function GrammarPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;
  const lesson = readingLessons.find((l) => l.id === lessonId);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!lesson) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, textAlign: 'center', marginTop: spacing.xl }}>
          <p style={{ fontSize: typography.sizes.base, color: colors.black }}>Lesson not found</p>
        </div>
      </div>
    );
  }

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
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.lg }}>
            <Link href={`/reading/${lessonId}`}>
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
              <h1 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', margin: 0, marginBottom: spacing.sm }}>
                📚 Грамматика
              </h1>
              <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: 0 }}>
                문법 학습 ({lesson.grammar.length} 항목)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {/* Grammar Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
          {lesson.grammar.map((grammar, index) => (
            <div
              key={grammar.id}
              style={{
                backgroundColor: colors.white,
                borderRadius: '16px',
                padding: spacing.lg,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: expandedId === grammar.id ? `2px solid ${colors.primary}` : '2px solid transparent',
              }}
              onClick={() => setExpandedId(expandedId === grammar.id ? null : grammar.id)}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: expandedId === grammar.id ? spacing.lg : 0,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#F3E8FF',
                      color: colors.primary,
                      borderRadius: '8px',
                      padding: `${spacing.xs} ${spacing.sm}`,
                      fontSize: typography.sizes.xs,
                      fontWeight: 'bold',
                      marginBottom: spacing.sm,
                    }}
                  >
                    #{index + 1}
                  </div>
                  <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0, marginBottom: spacing.xs }}>
                    {grammar.korean}
                  </h3>
                  {expandedId === grammar.id && (
                    <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                      {grammar.english}
                    </p>
                  )}
                </div>
                <div style={{ fontSize: '20px', color: colors.darkGray, transition: 'transform 0.2s', transform: expandedId === grammar.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▼
                </div>
              </div>

              {expandedId === grammar.id && (
                <div style={{ borderTop: `1px solid ${colors.gray}`, paddingTop: spacing.lg }}>
                  <div style={{ marginBottom: spacing.lg }}>
                    <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0, marginBottom: spacing.sm, fontWeight: 'bold' }}>
                      Пример:
                    </p>
                    <p
                      style={{
                        fontSize: typography.sizes.sm,
                        color: colors.black,
                        margin: 0,
                        backgroundColor: '#F3E8FF',
                        padding: spacing.md,
                        borderRadius: '8px',
                        lineHeight: '1.6',
                      }}
                    >
                      {grammar.example}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Button */}
        <div style={{ marginTop: spacing.xl }}>
          <Link href={`/reading/${lessonId}/vocabulary`}>
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
              다음: 단어 학습 →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
