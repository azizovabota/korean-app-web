'use client';

import { useState } from 'react';
import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';

type Tab = 'learning' | 'exam';
type Category = 'listening' | 'reading' | 'writing' | 'past_exam' | 'mock_test';

interface QuestionSet {
  id: string;
  title: string;
  korean: string;
  icon: string;
  total: number;
  completed: number;
  category: Category;
  tab: Tab;
}

export default function QuestionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('learning');

  const questionSets: QuestionSet[] = [
    {
      id: 'listening_1',
      title: 'Listening Comprehension',
      korean: '듣기 이해',
      icon: '🎧',
      total: 120,
      completed: 0,
      category: 'listening',
      tab: 'learning',
    },
    {
      id: 'reading_1',
      title: 'Reading Comprehension',
      korean: '읽기 이해',
      icon: '📖',
      total: 150,
      completed: 0,
      category: 'reading',
      tab: 'learning',
    },
    {
      id: 'writing_1',
      title: 'Writing Practice',
      korean: '쓰기 연습',
      icon: '✍️',
      total: 80,
      completed: 0,
      category: 'writing',
      tab: 'learning',
    },
    {
      id: 'past_exam_102_2025',
      title: 'Past Exam 102 (2025)',
      korean: '기출 102회 (2025)',
      icon: '📋',
      total: 100,
      completed: 0,
      category: 'past_exam',
      tab: 'exam',
    },
    {
      id: 'past_exam_101_2024',
      title: 'Past Exam 101 (2024)',
      korean: '기출 101회 (2024)',
      icon: '📋',
      total: 100,
      completed: 0,
      category: 'past_exam',
      tab: 'exam',
    },
    {
      id: 'past_exam_100_2024',
      title: 'Past Exam 100 (2024)',
      korean: '기출 100회 (2024)',
      icon: '📋',
      total: 100,
      completed: 0,
      category: 'past_exam',
      tab: 'exam',
    },
    {
      id: 'mock_test_1',
      title: 'Mock Test 1',
      korean: '모의고사 1',
      icon: '⏱️',
      total: 100,
      completed: 0,
      category: 'mock_test',
      tab: 'exam',
    },
    {
      id: 'mock_test_2',
      title: 'Mock Test 2',
      korean: '모의고사 2',
      icon: '⏱️',
      total: 100,
      completed: 0,
      category: 'mock_test',
      tab: 'exam',
    },
  ];

  const filteredSets = questionSets.filter((set) => set.tab === activeTab);

  const getProgressColor = (completed: number, total: number) => {
    const percentage = (completed / total) * 100;
    if (percentage >= 80) return '#10B981'; // green
    if (percentage >= 40) return '#F59E0B'; // amber
    return '#7C3AED'; // purple
  };

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: 0, marginBottom: spacing.sm }}>
                Questions
              </h1>
              <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: 0 }}>
                문제 풀기
              </p>
            </div>
            <div style={{ fontSize: '40px' }}>❓</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: `${spacing.lg} ${spacing.lg} 0` }}>
        <div style={{ display: 'flex', gap: spacing.lg, marginBottom: spacing.xl }}>
          {[
            { id: 'learning', label: 'Learning', korean: '학습' },
            { id: 'exam', label: 'Exam', korean: '시험' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              style={{
                flex: 1,
                backgroundColor: activeTab === tab.id ? colors.primary : colors.white,
                color: activeTab === tab.id ? colors.white : colors.black,
                border: `2px solid ${activeTab === tab.id ? colors.primary : colors.gray}`,
                borderRadius: '12px',
                padding: spacing.lg,
                fontSize: typography.sizes.base,
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Question Sets */}
        <div style={{ padding: `0 ${spacing.lg}` }}>
          {filteredSets.map((set) => (
            <div
              key={set.id}
              style={{
                backgroundColor: colors.white,
                borderRadius: '16px',
                padding: spacing.lg,
                marginBottom: spacing.lg,
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
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
                <div style={{ fontSize: '32px' }}>{set.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>
                    {set.title}
                  </h3>
                  <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                    {set.korean}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div style={{ marginBottom: spacing.lg }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: spacing.sm,
                  }}
                >
                  <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: 0 }}>
                    Progress
                  </p>
                  <p style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.primary, margin: 0 }}>
                    {set.completed}/{set.total}
                  </p>
                </div>

                {/* Progress Bar */}
                <div
                  style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: colors.gray,
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${(set.completed / set.total) * 100}%`,
                      height: '100%',
                      backgroundColor: getProgressColor(set.completed, set.total),
                      transition: 'width 0.3s',
                    }}
                  />
                </div>
              </div>

              {/* CTA Button */}
              <button
                style={{
                  width: '100%',
                  background: colors.gradient,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '8px',
                  padding: spacing.md,
                  fontSize: typography.sizes.sm,
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                시작하기 →
              </button>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div
          style={{
            margin: `${spacing.xl} ${spacing.lg} 0`,
            backgroundColor: '#F3E8FF',
            borderRadius: '12px',
            padding: spacing.lg,
            borderLeft: `4px solid ${colors.primary}`,
          }}
        >
          <p style={{ fontSize: typography.sizes.sm, color: colors.black, margin: 0, lineHeight: '1.5' }}>
            💡 <strong>팁:</strong> 꾸준한 연습으로 한국어 실력을 향상시키세요!
          </p>
        </div>
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
          { icon: '🏠', label: 'Main', href: '/' },
          { icon: '❓', label: 'Questions', href: '/questions', active: true },
          { icon: '📚', label: 'My Study', href: '#' },
          { icon: '📊', label: 'Analysis', href: '#' },
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
