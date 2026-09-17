'use client';

import Link from 'next/link';
import { useState } from 'react';
import { colors, typography, spacing } from '@/constants/colors';

interface LevelOption {
  level: number;
  name: string;
  range: string;
  min: number;
  max: number;
}

const levels: LevelOption[] = [
  { level: 3, name: 'Level 3', range: '120-149pts', min: 120, max: 149 },
  { level: 4, name: 'Level 4', range: '150-189pts', min: 150, max: 189 },
  { level: 5, name: 'Level 5', range: '190-229pts', min: 190, max: 229 },
  { level: 6, name: 'Level 6', range: '230-300pts', min: 230, max: 300 },
];

export default function EditGoalPage() {
  const [targetScore, setTargetScore] = useState(170);
  const [selectedLevel, setSelectedLevel] = useState(4);

  const getScorePercentage = () => {
    return ((targetScore - 120) / (300 - 120)) * 100;
  };

  const getLevelColor = () => {
    if (targetScore >= 230) return '#7C3AED'; // purple for level 6
    if (targetScore >= 190) return '#A78BFA'; // light purple for level 5
    if (targetScore >= 150) return '#8B5CF6'; // medium purple for level 4
    return '#7C3AED'; // default purple for level 3
  };

  const getLevelFromScore = () => {
    if (targetScore >= 230) return 6;
    if (targetScore >= 190) return 5;
    if (targetScore >= 150) return 4;
    return 3;
  };

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
            <Link href="/">
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
            <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', margin: 0 }}>
              Edit My Goal
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {/* Target Score Section */}
        <div
          style={{
            backgroundColor: colors.white,
            borderRadius: '16px',
            padding: spacing.xl,
            marginBottom: spacing.xl,
            boxShadow: '0 4px 12px rgba(124, 58, 237, 0.1)',
          }}
        >
          <h2 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, margin: 0, marginBottom: spacing.xl }}>
            Target Score
          </h2>

          {/* Circular Progress */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: spacing.xl, position: 'relative', height: '240px' }}>
            <div
              style={{
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: `conic-gradient(${getLevelColor()} 0%, ${getLevelColor()} ${getScorePercentage()}%, ${colors.gray} ${getScorePercentage()}%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                <p style={{ fontSize: typography.sizes['3xl'], fontWeight: 'bold', color: colors.black, margin: 0 }}>
                  {targetScore}
                </p>
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.sm} 0 0 0` }}>
                  / Goal 300
                </p>
              </div>
            </div>
          </div>

          {/* Level Badge */}
          <div
            style={{
              backgroundColor: '#F3E8FF',
              border: `2px solid ${colors.primary}`,
              borderRadius: '12px',
              padding: spacing.lg,
              marginBottom: spacing.lg,
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0, marginBottom: spacing.sm }}>
              Current Goal
            </p>
            <p style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.primary, margin: 0 }}>
              TOPIK II Level {getLevelFromScore()}
            </p>
          </div>

          {/* Slider */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: spacing.md,
              }}
            >
              <p style={{ fontSize: typography.sizes.xs, color: colors.darkGray, margin: 0 }}>
                Adjust Score
              </p>
            </div>

            <input
              type="range"
              min="120"
              max="300"
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              style={{
                width: '100%',
                height: '8px',
                borderRadius: '4px',
                background: `linear-gradient(to right, ${colors.gray} 0%, ${getLevelColor()} ${getScorePercentage()}%, ${colors.gray} ${getScorePercentage()}%, ${colors.gray} 100%)`,
                WebkitAppearance: 'none',
                appearance: 'none',
                cursor: 'pointer',
              }}
            />

            {/* Slider labels */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: spacing.md,
                fontSize: typography.sizes.sm,
                fontWeight: 'bold',
                color: colors.primary,
              }}
            >
              <span>120</span>
              <span>210</span>
              <span>300</span>
            </div>
          </div>
        </div>

        {/* Level Selection */}
        <div style={{ marginBottom: spacing.xl }}>
          <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0, marginBottom: spacing.lg }}>
            TOPIK II  Level 3 - 6 · out of 300
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.lg }}>
            {levels.map((level) => (
              <button
                key={level.level}
                onClick={() => setTargetScore(Math.ceil((level.min + level.max) / 2))}
                style={{
                  backgroundColor: getLevelFromScore() === level.level ? colors.primary : colors.white,
                  color: getLevelFromScore() === level.level ? colors.white : colors.black,
                  border: getLevelFromScore() === level.level ? `2px solid ${colors.primary}` : `2px solid ${colors.gray}`,
                  borderRadius: '16px',
                  padding: spacing.lg,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <p style={{ fontSize: typography.sizes.base, fontWeight: 'bold', margin: 0, marginBottom: spacing.xs }}>
                  {level.name}
                </p>
                <p style={{ fontSize: typography.sizes.xs, margin: 0, opacity: 0.7 }}>
                  {level.range}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
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
            marginBottom: spacing.lg,
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
