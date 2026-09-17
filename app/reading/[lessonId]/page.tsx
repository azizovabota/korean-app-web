'use client';

import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';
import { readingLessons } from '@/data/readingLessons';
import { useParams } from 'next/navigation';

export default function LessonModulesPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;
  const lesson = readingLessons.find((l) => l.id === lessonId);

  if (!lesson) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, textAlign: 'center', marginTop: spacing.xl }}>
          <p style={{ fontSize: typography.sizes.base, color: colors.black }}>Lesson not found</p>
          <Link href="/reading">
            <button
              style={{
                marginTop: spacing.lg,
                background: colors.gradient,
                color: colors.white,
                border: 'none',
                borderRadius: '12px',
                padding: spacing.lg,
                cursor: 'pointer',
              }}
            >
              Back to Lessons
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const modules = [
    {
      id: 'grammar',
      title: '📚 Грамматика',
      korean: '문법',
      description: `${lesson.grammar.length} грамматических правил`,
      icon: '📚',
      color: '#7C3AED',
      href: `/reading/${lessonId}/grammar`,
    },
    {
      id: 'vocabulary',
      title: '📖 Слова',
      korean: '단어',
      description: `${lesson.vocabulary.length} слов для изучения`,
      icon: '📖',
      color: '#8B5CF6',
      href: `/reading/${lessonId}/vocabulary`,
    },
    {
      id: 'test',
      title: '✅ Тест',
      korean: '테스트',
      description: `${lesson.test.length} вопросов`,
      icon: '✅',
      color: '#A78BFA',
      href: `/reading/${lessonId}/test`,
    },
  ];

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
            <Link href="/reading">
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
                {lesson.title}
              </h1>
              <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: 0 }}>
                {lesson.description}
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
            💡 추천 순서: 문법 → 단어 → 테스트
          </p>
        </div>

        {/* Modules Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
          {modules.map((module) => (
            <Link key={module.id} href={module.href}>
              <div
                style={{
                  backgroundColor: colors.white,
                  borderRadius: '16px',
                  padding: spacing.lg,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  border: `2px solid transparent`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: spacing.lg,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 20px rgba(124, 58, 237, 0.2)';
                  (e.currentTarget as HTMLElement).style.borderColor = colors.primary;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                }}
              >
                <div style={{ fontSize: '40px' }}>{module.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0, marginBottom: spacing.xs }}>
                    {module.title}
                  </h3>
                  <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0 }}>
                    {module.description}
                  </p>
                  <p style={{ fontSize: typography.sizes.xs, color: module.color, margin: `${spacing.sm} 0 0 0`, fontWeight: 'bold' }}>
                    {module.korean}
                  </p>
                </div>
                <div style={{ fontSize: '20px', color: colors.darkGray }}>›</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Progress Info */}
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
            📊 학습 현황
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: spacing.md }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0, marginBottom: spacing.xs }}>
                문법
              </p>
              <p style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.primary, margin: 0 }}>
                {lesson.grammar.length}
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0, marginBottom: spacing.xs }}>
                단어
              </p>
              <p style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.primary, margin: 0 }}>
                {lesson.vocabulary.length}
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0, marginBottom: spacing.xs }}>
                테스트
              </p>
              <p style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.primary, margin: 0 }}>
                {lesson.test.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
