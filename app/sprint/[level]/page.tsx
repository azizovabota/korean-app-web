'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import { WORD_LEVELS, getLevelWords, type WordCard } from '@/lib/wordCards';

const RIGHT = '#10B981';
const WRONG = '#EF4444';
const SPRINT_SECONDS = 60;

type Phase = 'ready' | 'playing' | 'finished';

interface Claim {
  word: WordCard;
  translation: string;
  isTrue: boolean;
}

// Показывает слово и предлагаемый перевод: верный или чужой
function makeClaim(words: WordCard[]): Claim | null {
  if (words.length === 0) return null;
  const word = words[Math.floor(Math.random() * words.length)];
  const isTrue = Math.random() < 0.5;
  if (isTrue) return { word, translation: word.translation, isTrue };
  const others = words.filter((item) => item.translation !== word.translation);
  if (others.length === 0) return { word, translation: word.translation, isTrue: true };
  const other = others[Math.floor(Math.random() * others.length)];
  return { word, translation: other.translation, isTrue: false };
}

export default function SprintPage() {
  const params = useParams();
  const level = WORD_LEVELS.find((item) => item.id === String(params.level));

  const [phase, setPhase] = useState<Phase>('ready');
  const [secondsLeft, setSecondsLeft] = useState(SPRINT_SECONDS);
  const [claim, setClaim] = useState<Claim | null>(null);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [lastResult, setLastResult] = useState<boolean | null>(null);

  const words = level ? getLevelWords(level.id) : [];

  // Таймер: тикает каждую секунду и завершает спринт через 60 секунд
  useEffect(() => {
    if (phase !== 'playing') return;
    const tick = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    const finish = setTimeout(() => setPhase('finished'), SPRINT_SECONDS * 1000);
    return () => {
      clearInterval(tick);
      clearTimeout(finish);
    };
  }, [phase]);

  if (!level) {
    return <p style={{ padding: spacing.lg }}>Уровень не найден</p>;
  }

  const start = () => {
    setCorrect(0);
    setWrong(0);
    setLastResult(null);
    setSecondsLeft(SPRINT_SECONDS);
    setClaim(makeClaim(words));
    setPhase('playing');
  };

  const answer = (judgement: boolean) => {
    if (!claim) return;
    const isRight = judgement === claim.isTrue;
    if (isRight) setCorrect((c) => c + 1);
    else setWrong((w) => w + 1);
    setLastResult(isRight);
    setClaim(makeClaim(words));
  };

  const cardStyle = { backgroundColor: colors.white, borderRadius: '16px', padding: spacing.xl, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', textAlign: 'center' as const };
  const answerButton = { flex: 1, padding: spacing.lg, borderRadius: '12px', fontSize: typography.sizes.base, fontWeight: '600' as const, cursor: 'pointer' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/sprint" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm }}>← Спринт</Link>
          {phase === 'playing' && <span style={{ fontSize: typography.sizes.lg, fontWeight: 'bold' }}>⏱ {secondsLeft} с</span>}
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {phase === 'ready' && (
          <div style={cardStyle}>
            <p style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', color: colors.black, margin: `0 0 ${spacing.md} 0` }}>{level.title}</p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `0 0 ${spacing.xl} 0` }}>
              За 60 секунд отметьте, верен ли перевод. Чем больше верных ответов, тем лучше.
            </p>
            <button onClick={start} style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: 'pointer' }}>
              Начать спринт
            </button>
          </div>
        )}

        {phase === 'playing' && claim && (
          <>
            <div style={{ ...cardStyle, minHeight: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: spacing.lg }}>
              <p style={{ fontSize: '40px', fontWeight: 'bold', color: colors.black, margin: 0 }}>{claim.word.word}</p>
              <p style={{ fontSize: typography.sizes.lg, color: colors.black, margin: `${spacing.lg} 0 0 0` }}>{claim.translation}</p>
            </div>

            <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.md }}>
              <button onClick={() => answer(false)} style={{ ...answerButton, backgroundColor: '#FEF2F2', color: WRONG, border: `2px solid #FECACA` }}>✕ Неверно</button>
              <button onClick={() => answer(true)} style={{ ...answerButton, backgroundColor: '#ECFDF5', color: RIGHT, border: `2px solid #A7F3D0` }}>✓ Верно</button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: typography.sizes.sm, color: colors.darkGray }}>
              <span>Верно: {correct}</span>
              <span>Ошибок: {wrong}</span>
              {lastResult !== null && <span style={{ color: lastResult ? RIGHT : WRONG, fontWeight: 'bold' }}>{lastResult ? 'Да' : 'Нет'}</span>}
            </div>
          </>
        )}

        {phase === 'finished' && (
          <div style={cardStyle}>
            <p style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', color: colors.black, margin: `0 0 ${spacing.md} 0` }}>Время вышло</p>
            <p style={{ fontSize: typography.sizes.base, color: colors.black, margin: `0 0 ${spacing.xl} 0` }}>
              Верно: {correct} · Ошибок: {wrong}
            </p>
            <button onClick={() => setPhase('ready')} style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.md }}>
              Играть снова
            </button>
            <Link href="/sprint" style={{ color: colors.primary, fontSize: typography.sizes.sm, textDecoration: 'none' }}>← Все уровни</Link>
          </div>
        )}
      </div>
    </div>
  );
}
