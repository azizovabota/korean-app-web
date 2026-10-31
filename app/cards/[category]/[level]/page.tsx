'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import { recordMistake } from '@/lib/account';
import { cardKey, countLeft, getLevelCategory, loadTest, markWord, type WordCard } from '@/lib/wordCards';

const KNOW = { color: '#059669', background: '#ECFDF5', border: '#A7F3D0' };
const DONT_KNOW = { color: '#B7791F', background: '#FEF9E7', border: '#F6E7B0' };

export default function WordCardsTestPage() {
  const params = useParams();
  const folderId = String(params.category);
  const category = getLevelCategory(folderId, String(params.level));

  const [loaded, setLoaded] = useState(false);
  const [cards, setCards] = useState<WordCard[]>([]);
  const [left, setLeft] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);

  const finished = loaded && index >= cards.length;

  const applyTest = (next: { cards: WordCard[]; left: number }) => {
    setCards(next.cards);
    setLeft(next.left);
    setIndex(0);
    setFlipped(false);
    setKnownCount(0);
    setUnknownCount(0);
    setLoaded(true);
  };

  const startTest = () => {
    if (category) loadTest(category).then(applyTest);
  };

  useEffect(() => {
    let cancelled = false;
    if (category) {
      loadTest(category).then((next) => {
        if (!cancelled) applyTest(next);
      });
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category?.id]);

  // После теста считаем, сколько слов ещё не пройдено
  useEffect(() => {
    if (!finished || !category) return;
    countLeft(category).then(setLeft);
  }, [finished, category]);

  if (!category) {
    return <p style={{ padding: spacing.lg }}>Папка не найдена</p>;
  }

  const card = cards[index];

  const handleKnow = () => {
    markWord(category.id, card.id, true).catch(() => undefined);
    setKnownCount((c) => c + 1);
    setFlipped(false);
    setIndex((i) => i + 1);
  };

  const handleDontKnow = () => {
    // Слово попадёт в следующий тест
    markWord(category.id, card.id, false).catch(() => undefined);
    setUnknownCount((c) => c + 1);
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
          <Link href={`/cards/${folderId}`} style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm }}>← Назад</Link>
          {loaded && !finished && <span style={{ fontSize: typography.sizes.sm, opacity: 0.9 }}>{index + 1} / {cards.length}</span>}
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {!loaded && (
          <p style={{ textAlign: 'center', color: colors.darkGray, fontSize: typography.sizes.sm }}>Загрузка…</p>
        )}

        {finished && (
          <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.xl, textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 180, 216, 0.1)' }}>
            <p style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', color: colors.black, margin: `0 0 ${spacing.md} 0` }}>
              {cards.length === 0 ? 'Все слова пройдены' : 'Тест пройден'}
            </p>
            {cards.length > 0 && (
              <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `0 0 ${spacing.xl} 0` }}>
                Знаю: {knownCount} · Не знаю: {unknownCount}
              </p>
            )}
            {left !== null && left > 0 && (
              <button onClick={startTest} style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.md }}>
                Следующий тест →
              </button>
            )}
            <Link href={`/cards/${folderId}`} style={{ color: colors.primary, fontSize: typography.sizes.sm, textDecoration: 'none' }}>← Назад к уровням</Link>
          </div>
        )}

        {loaded && !finished && (
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
