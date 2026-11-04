'use client';

import { useState } from 'react';
import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';
import { GRAMMAR_GROUPS } from '@/lib/grammar';

export default function GrammarGroupsPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Link href="/questions" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm, opacity: 0.9 }}>← Уроки</Link>
          <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: `${spacing.md} 0 0 0` }}>Грамматические тренировки</h1>
          <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: `${spacing.sm} 0 0 0` }}>Учитесь в контексте реальных предложений</p>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
        {GRAMMAR_GROUPS.map((group) => {
          const isOpen = openId === group.id;
          return (
            <div key={group.id}>
              <button
                onClick={() => setOpenId(isOpen ? null : group.id)}
                style={{ width: '100%', backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, border: `2px solid ${isOpen ? colors.primary : 'transparent'}`, boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, cursor: 'pointer' }}
              >
                <span>
                  {group.title}
                  <span style={{ marginLeft: spacing.sm, fontSize: typography.sizes.xs, fontWeight: 'normal', color: colors.darkGray }}>{group.topics.length} тем</span>
                </span>
                <span style={{ color: colors.primary }}>{isOpen ? '▾' : '▸'}</span>
              </button>

              {isOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm, marginTop: spacing.sm, paddingLeft: spacing.md }}>
                  {group.topics.map((topic) => (
                    <Link key={topic.id} href={`/grammar/${topic.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ backgroundColor: colors.white, borderRadius: '12px', padding: spacing.md, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0, 180, 216, 0.08)' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, flexWrap: 'wrap' }}>
                            <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0 }}>{topic.korean}</h3>
                            <span style={{ fontSize: typography.sizes.xs, color: colors.primary, border: `1px solid ${colors.primary}`, borderRadius: '6px', padding: '1px 6px' }}>
                              {topic.level_ru.split(' ')[0]}
                            </span>
                          </div>
                          <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.xs} 0 0 0` }}>{topic.russian}</p>
                          <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>Упражнений: {topic.exercise_count}</p>
                        </div>
                        <span style={{ fontSize: typography.sizes.lg, color: colors.primary }}>→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
