'use client';

import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';

export default function Home() {
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
              <p style={{ fontSize: typography.sizes.sm, opacity: 0.9 }}>20:24</p>
              <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: 0 }}>
                Korean App
              </h1>
            </div>
            <div style={{ fontSize: '32px' }}>🎓</div>
          </div>

          {/* Goal Card */}
          <Link href="/edit-goal">
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '16px',
                padding: spacing.lg,
                border: '2px dashed rgba(255, 255, 255, 0.5)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <p style={{ fontSize: typography.sizes.sm, margin: 0 }}>✏️ Edit My Goal</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {/* Current Goal */}
        <div
          style={{
            backgroundColor: colors.white,
            borderRadius: '16px',
            padding: spacing.lg,
            marginBottom: spacing.xl,
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.1)',
          }}
        >
          <div
            style={{
              background: colors.gradient,
              color: colors.white,
              borderRadius: '12px',
              padding: spacing.lg,
              textAlign: 'center',
              marginBottom: spacing.lg,
            }}
          >
            <p style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', margin: 0 }}>
              👑 GOAL TOPIK II Level 0
            </p>
          </div>

          {/* Daily Streak */}
          <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: colors.black, marginBottom: spacing.md }}>
            TOPIK of the Day
          </p>
          <div style={{ display: 'flex', gap: spacing.sm, justifyContent: 'space-between', marginBottom: spacing.lg }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: idx === 0 ? colors.primary : colors.lightGray,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.white,
                    fontWeight: 'bold',
                    fontSize: '20px',
                  }}
                >
                  ✓
                </div>
                <p style={{ fontSize: typography.sizes.xs, marginTop: spacing.sm, color: colors.darkGray }}>
                  {day}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* My Current Level */}
        <h2 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, marginBottom: spacing.lg }}>
          My Current Level
        </h2>

        <div style={{ textAlign: 'center', marginBottom: spacing.xl }}>
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: `conic-gradient(${colors.primary} 0%, ${colors.primary} 0%, ${colors.lightGray} 0%)`,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(124, 58, 237, 0.2)',
            }}
          >
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
              <p style={{ fontSize: '48px', fontWeight: 'bold', margin: 0, color: colors.black }}>
                0
              </p>
              <p style={{ fontSize: typography.sizes.sm, color: colors.primary, fontWeight: 'bold', margin: `${spacing.sm} 0 0 0` }}>
                Goal 0
              </p>
            </div>
          </div>

          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: '12px',
              padding: spacing.lg,
              marginTop: spacing.lg,
              display: 'flex',
              alignItems: 'center',
              gap: spacing.md,
            }}
          >
            <div style={{ fontSize: '32px' }}>🚀</div>
            <p style={{ fontSize: typography.sizes.base, color: colors.black, margin: 0 }}>
              Take a level test to see your report!
            </p>
          </div>

          <Link href="/topik">
            <button
              style={{
                width: '100%',
                background: colors.gradient,
                color: colors.white,
                border: 'none',
                borderRadius: '16px',
                padding: spacing.lg,
                fontSize: typography.sizes.base,
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: spacing.lg,
              }}
            >
              Start First Level Test &gt;
            </button>
          </Link>
        </div>

        {/* Question Category */}
        <h2 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, marginBottom: spacing.lg }}>
          Question Category
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg }}>
          {[
            { icon: '🎧', title: 'Listening', korean: '듣기', badge: '+750' },
            { icon: '📖', title: 'Reading', korean: '읽기', badge: '+750' },
            { icon: '✍️', title: 'Writing', korean: '쓰기', badge: '+500' },
            { icon: '📝', title: 'Mock Test', korean: '기출 모의고사', badge: '+1000' },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: colors.white,
                borderRadius: '16px',
                padding: spacing.lg,
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '12px',
                  backgroundColor: '#F3E8FF',
                  color: colors.primary,
                  borderRadius: '8px',
                  padding: `${spacing.xs} ${spacing.sm}`,
                  fontSize: typography.sizes.xs,
                  fontWeight: 'bold',
                }}
              >
                {item.badge}
              </div>

              <p style={{ fontSize: '40px', margin: `0 0 ${spacing.sm} 0` }}>{item.icon}</p>
              <p style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: `0 0 ${spacing.xs} 0` }}>
                {item.title}
              </p>
              <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: 0 }}>
                {item.korean}
              </p>
            </div>
          ))}
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
          { icon: '📚', label: 'My Study', href: '/my-study' },
          { icon: '📊', label: 'Analysis', href: '/analysis' },
        ].map((item) => (
          <Link key={item.label} href={item.href}>
            <div
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                color: item.href === '/' ? colors.primary : colors.darkGray,
              }}
            >
              <p style={{ fontSize: '24px', margin: `0 0 ${spacing.xs} 0` }}>
                {item.icon}
              </p>
              <p style={{ fontSize: typography.sizes.xs, margin: 0, fontWeight: item.href === '/' ? 'bold' : 'normal' }}>
                {item.label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
