'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import { recordMistake } from '@/lib/account';
import { cardKey, countSessions, getSessionWords, getWordCategory, type WordCard } from '@/lib/wordCards';

const KNOW = { color: '#059669', background: '#ECFDF5', border: '#A7F3D0' };
const DONT_KNOW = { color: '#B7791F', background: '#FEF9E7', border: '#F6E7B0' };

export default function WordCardsSessionPage() {
  const params = useParams();
  const categoryId = String(params.category);
  const session = Number(params.batch);
  const category = getWordCategory(categoryId);

  const validSession = Boolean(category) && Number.isInteger(session) && session >= 1 && session <= countSessions(category!);
  const initialWords = validSession ? getSessionWords(category!, session) : [];

  // Очередь текущей порции; «не знаю» возвращает слово в конец очереди
  const [queue, setQueue] = useState<WordCard[]>(initialWords);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);

  if (!category || !validSession) {
    return <p style={{ padding: spacing.lg }}>Слова не найдены</p>;
  }

  const words = queue;
  const finished = index >= words.length;
  const card = words[index];
  const hasNextSession = session < countSessions(category);

  const restart = () => {
    setQueue(getSessionWords(category, session));
    setIndex(0);
    setFlipped(false);
    setKnownCount(0);
    setUnknownCount(0);
  };

  const handleKnow = () => {
    setKnownCount((c) => c + 1);
    setFlipped(false);
    setIndex((i) => i + 1);
  };

  const handleDontKnow = () => {
    // Слово возвращается в конец текущей порции и попадает в повторение
    setUnknownCount((c) => c + 1);
    setQueue([...words, card]);
    setFlipped(false);
    setIndex((i) => i + 1);
    recordMistake({
      question_key: cardKey(category.id, card.id),
      source: 'cards',
      prompt: card.word,
      user_answer: '',
      correct_answer: card.translation,
    }).catch(() => undefined);
  };

  const buttonBase = {
    flex: 1,
    padding: spacing.lg,
    borderRadius: '999px',
    fontSize: typography.sizes.base,
    fontWeight: '600' as const,
    cursor: 'pointer',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/cards" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm }}>← Карточки</Link>
          {!finished && <span style={{ fontSize: typography.sizes.sm, opacity: 0.9 }}>{index + 1} / {words.length}</span>}
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {finished ? (
          <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.xl, textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)' }}>
            <p style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', color: colors.black, margin: `0 0 ${spacing.md} 0` }}>Порция пройдена</p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `0 0 ${spacing.xl} 0` }}>
              Знаю: {knownCount} · Не знаю: {unknownCount}
            </p>
            {hasNextSession && (
              <Link href={`/cards/${category.id}/${session + 1}`} style={{ display: 'block', textDecoration: 'none', marginBottom: spacing.md }}>
                <div style={{ background: colors.gradient, color: colors.white, borderRadius: '12px', padding: spacing.lg, fontWeight: '600' }}>Следующие слова →</div>
              </Link>
            )}
            <button onClick={restart} style={{ width: '100%', backgroundColor: colors.white, color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: '12px', padding: spacing.md, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.md }}>
              Пройти заново
            </button>
            <Link href="/cards" style={{ color: colors.primary, fontSize: typography.sizes.sm, textDecoration: 'none' }}>← Все папки</Link>
          </div>
        ) : (
          <>
            <div
              onClick={() => setFlipped((f) => !f)}
              style={{ backgroundColor: colors.white, borderRadius: '16px', minHeight: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: spacing.xl, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', cursor: 'pointer', textAlign: 'center', marginBottom: spacing.lg }}
            >
              <p style={{ fontSize: '40px', fontWeight: 'bold', color: colors.black, margin: 0 }}>{card.word}</p>
              {flipped ? (
                <p style={{ fontSize: typography.sizes.lg, color: colors.darkGray, margin: `${spacing.lg} 0 0 0` }}>{card.translation}</p>
              ) : (
                <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `${spacing.lg} 0 0 0` }}>Нажмите на карточку, чтобы показать перевод</p>
              )}
            </div>

            <div style={{ display: 'flex', gap: spacing.md }}>
              <button onClick={handleDontKnow} style={{ ...buttonBase, backgroundColor: DONT_KNOW.background, color: DONT_KNOW.color, border: `2px solid ${DONT_KNOW.border}` }}>
                ✕ Пока не знаю
              </button>
              <button onClick={handleKnow} style={{ ...buttonBase, backgroundColor: KNOW.background, color: KNOW.color, border: `2px solid ${KNOW.border}` }}>
                ✓ Знаю
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
