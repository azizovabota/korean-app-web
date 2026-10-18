'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { CiExercise, type CiDecision, type CiItem } from '@/components/CiExercise';
import { ciLevels, ciMethods } from '@/lib/ciLevels';
import { buildSession, resetDecisions, saveDecision } from '@/lib/ciStore';
import data from '@/data/ciBeginner.json';
import { colors, typography, spacing } from '@/constants/colors';

const allItems: CiItem[] = data.lessons.flatMap((lesson) => lesson.items);

export default function CiMethodPage() {
  const params = useParams();
  const level = String(params.level);
  const method = String(params.method);
  const levelConfig = ciLevels[level];
  const methodConfig = ciMethods[method];

  const [session, setSession] = useState<CiItem[] | null>(null);

  const startSession = () => setSession(buildSession(allItems));

  useEffect(() => {
    startSession();
  }, []);

  if (!levelConfig?.hasData || !methodConfig) {
    return <p style={{ padding: spacing.lg }}>Не найдено</p>;
  }

  const handleDecide = (item: CiItem, decision: CiDecision) => {
    saveDecision(item.id, decision);
  };

  const handleReset = () => {
    resetDecisions();
    startSession();
  };

  return (
    <div>
      {session === null ? (
        <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray }} />
      ) : (
        <CiExercise
          key={session.map((i) => i.id).join(',')}
          items={session}
          mode={method === 'listen' || method === 'dictation' ? (method as 'listen' | 'dictation') : 'read'}
          title={`CI · ${levelConfig.title}`}
          backHref={`/ci/${level}`}
          onDecide={handleDecide}
          onRestart={startSession}
          onReset={handleReset}
          emptyMessage="Все предложения убраны из теста."
        />
      )}
    </div>
  );
}
