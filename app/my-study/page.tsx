'use client';

import { useState } from 'react';
import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';

type StudyTab = 'learning' | 'incorrect';
type StudyCategory = 'all' | 'listening' | 'reading' | 'saved';

interface StudyItem {
  id: string;
  title: string;
  category: StudyCategory;
  tab: StudyTab;
  date: string;
  correctCount?: number;
}

export default function MyStudyPage() {
  const [activeTab, setActiveTab] = useState<StudyTab>('learning');
  const [activeCategory, setActiveCategory] = useState<StudyCategory>('all');

  const studyItems: StudyItem[] = [];

  const categories = [
    { id: 'all', label: 'All', icon: '📊' },
    { id: 'listening', label: 'Listening', icon: '🎧' },
    { id: 'reading', label: 'Reading', icon: '📖' },
    { id: 'saved', label: '🔖', icon: '🔖' },
  ];

  const filteredItems = studyItems.filter(
    (item) => item.tab === activeTab && (activeCategory === 'all' || item.category === activeCategory)
  );

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
            My Study
          </h1>
          <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: 0 }}>
            내 학습 기록
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {/* Main Tabs */}
        <div style={{ display: 'flex', gap: spacing.lg, marginBottom: spacing.xl }}>
          {[
            { id: 'learning', label: 'Learning' },
            { id: 'incorrect', label: 'Incorrect' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as StudyTab)}
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

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.xl, overflowX: 'auto' }}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as StudyCategory)}
              style={{
                backgroundColor: activeCategory === category.id ? colors.primary : 'transparent',
                color: activeCategory === category.id ? colors.white : colors.black,
                border: activeCategory === category.id ? `2px solid ${colors.primary}` : `1px solid ${colors.gray}`,
                borderRadius: '12px',
                padding: `${spacing.sm} ${spacing.lg}`,
                fontSize: typography.sizes.sm,
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: '16px',
              padding: spacing.xl,
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.1)',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: spacing.lg }}>ℹ️</div>
            <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0, marginBottom: spacing.sm }}>
              No study history yet.
            </h3>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0, lineHeight: '1.5' }}>
              {activeTab === 'learning'
                ? 'Your personalized learning data will appear here.'
                : "You don't have any incorrect answers yet. Keep exploring the Question Bank to test your limits."}
            </p>
          </div>
        )}

        {/* Study Items List */}
        {filteredItems.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: colors.white,
                  borderRadius: '12px',
                  padding: spacing.lg,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                }}
              >
                <p style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>
                  {item.title}
                </p>
                <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                  {item.date}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tip Box */}
        <div
          style={{
            margin: `${spacing.xl} 0 0`,
            backgroundColor: '#F3E8FF',
            borderRadius: '12px',
            padding: spacing.lg,
            borderLeft: `4px solid ${colors.primary}`,
          }}
        >
          <p style={{ fontSize: typography.sizes.sm, color: colors.black, margin: 0, lineHeight: '1.5' }}>
            💡 <strong>팁:</strong> 정기적으로 복습하면 한국어 실력이 더욱 향상됩니다!
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
          { icon: '❓', label: 'Questions', href: '/questions' },
          { icon: '📚', label: 'My Study', href: '/my-study', active: true },
          { icon: '📊', label: 'Analysis', href: '/analysis' },
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
