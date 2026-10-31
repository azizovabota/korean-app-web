'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import { WORD_LEVELS, getLevelWords, isTranslationCorrect } from '@/lib/wordCards';

const RIGHT = '#10B981';
const WRONG = '#EF4444';
const ROUND_SIZE = 20;

export default function TranslateWordsPage() {
  const params = useParams();
  const levelId = String(params.level);
  const level = WORD_LEVELS.find((item) => item.id === levelId);

  const [round, setRound] = useState(0);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  if (!level) {
    return <p style={{ padding: spacing.lg }}>Уровень не найден</p>;
  }

  const words = getLevelWords(level.id);
  const deck = words.slice(round * ROUND_SIZE, round * ROUND_SIZE + ROUND_SIZE);
  const finished = index >= deck.length;
  const hasNextRound = (round + 1) * ROUND_SIZE < words.length;
  const word = deck[index];

  const nextWord = () => {
    setIndex((i) => i + 1);
    setAnswer('');
    setResult(null);
  };

  const nextRound = () => {
    setRound((r) => r + 1);
    setIndex(0);
    setScore(0);
    setAnswer('');
    setResult(null);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (result) {
      nextWord();
      return;
    }
    if (!answer.trim()) return;
    const correct = isTranslationCorrect(answer, word.translation);
    setResult(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + 1);
  };

  const cardStyle = { backgroundColor: colors.white, borderRadius: '16px', padding: spacing.xl, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', textAlign: 'center' as const };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/translate" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm }}>← Перевод слов</Link>
          {!finished && <span style={{ fontSize: typography.sizes.sm, opacity: 0.9 }}>{index + 1} / {deck.length}</span>}
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {finished ? (
          <div style={cardStyle}>
            <p style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', color: colors.black, margin: `0 0 ${spacing.md} 0` }}>
              Верно: {score} из {deck.length}
            </p>
            {hasNextRound && (
              <button onClick={nextRound} style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontWeight: '600', cursor: 'pointer', marginTop: spacing.lg }}>
                Следующие {ROUND_SIZE} слов →
              </button>
            )}
            <Link href="/translate" style={{ display: 'block', color: colors.primary, fontSize: typography.sizes.sm, textDecoration: 'none', marginTop: spacing.md }}>← Все уровни</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: spacing.lg }}>
            <div style={{ ...cardStyle, minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontSize: '40px', fontWeight: 'bold', color: colors.black, margin: 0 }}>{word.word}</p>
              <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.md} 0 0 0` }}>Введите перевод на русский</p>
            </div>

            <input
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              disabled={result !== null}
              placeholder="Перевод"
              autoFocus
              style={{ width: '100%', boxSizing: 'border-box', padding: spacing.lg, borderRadius: '12px', border: `2px solid ${result === 'correct' ? RIGHT : result === 'wrong' ? WRONG : colors.gray}`, fontSize: typography.sizes.base, backgroundColor: colors.white, color: colors.black }}
            />

            {result && (
              <div style={{ ...cardStyle, padding: spacing.lg, textAlign: 'left', borderLeft: `4px solid ${result === 'correct' ? RIGHT : WRONG}` }}>
                <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: result === 'correct' ? RIGHT : WRONG, margin: `0 0 ${spacing.sm} 0` }}>
                  {result === 'correct' ? 'Верно!' : 'Неверно'}
                </p>
                <p style={{ fontSize: typography.sizes.sm, color: colors.black, margin: 0 }}>Правильный перевод: {word.translation}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={result === null && !answer.trim()}
              style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: 'pointer', opacity: result === null && !answer.trim() ? 0.5 : 1 }}
            >
              {result === null ? 'Проверить' : 'Далее →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
