'use client';

import { useState } from 'react';
import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';
import { clearMistake, recordMistake } from '@/lib/account';

export interface CiItem {
  id: string;
  full: string;
  fullRu: string;
  blanked: string;
  word: string;
  translation: string;
  hint: string;
  words: { surface: string; translation: string }[];
}

export type CiDecision = 'remove' | 'keep';
export type CiMode = 'listen' | 'read' | 'dictation';

interface CiExerciseProps {
  items: CiItem[];
  mode: CiMode;
  title: string;
  backHref: string;
  onDecide: (item: CiItem, decision: CiDecision) => void;
  onRestart: () => void;
  onReset: () => void;
  emptyMessage: string;
}

const RIGHT = '#10B981';
const WRONG = '#EF4444';

function pickKoreanVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('ko'));
  return voices.find((v) => v.name === 'Yuna') ?? voices[0];
}

function speakFallback(text: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.9;
  const voice = pickKoreanVoice();
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

function playItem(item: CiItem) {
  const audio = new Audio(`/audio/ci/${item.id}.mp3`);
  audio.play().catch(() => speakFallback(item.full));
}

function normalizeSentence(text: string) {
  return text.replace(/[\s.,!?'"]/g, '');
}

const cardStyle = {
  backgroundColor: colors.white,
  borderRadius: '16px',
  padding: spacing.lg,
  marginBottom: spacing.lg,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const labelStyle = {
  fontSize: typography.sizes.sm,
  color: colors.darkGray,
  margin: `0 0 ${spacing.sm} 0`,
  fontWeight: 'bold' as const,
};

export function CiExercise({ items, mode, title, backHref, onDecide, onRestart, onReset, emptyMessage }: CiExerciseProps) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [solved, setSolved] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [translationOpen, setTranslationOpen] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = items.length;
  const isListen = mode === 'listen';
  const isDictation = mode === 'dictation';
  const hasAttempts = mode !== 'read';
  const maxAttempts = isDictation ? 5 : 3;

  if (total === 0) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, padding: spacing.lg }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: typography.sizes.base, color: colors.black, margin: `${spacing.xl} 0` }}>{emptyMessage}</p>
          <button
            onClick={onReset}
            style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.md }}
          >
            Сбросить решения и начать заново
          </button>
          <Link href={backHref} style={{ color: colors.primary }}>← Назад</Link>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
        <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', margin: 0 }}>{title} — результат</h1>
          </div>
        </div>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, textAlign: 'center' }}>
          <p style={{ fontSize: typography.sizes['3xl'], fontWeight: 'bold', color: colors.black, margin: `${spacing.xl} 0 ${spacing.sm} 0` }}>
            {correctCount} / {total}
          </p>
          <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, marginBottom: spacing.xl }}>правильных ответов</p>
          <button
            onClick={onRestart}
            style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.md }}
          >
            Новые 15 предложений
          </button>
          <Link href={backHref} style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ border: `2px solid ${colors.primary}`, borderRadius: '12px', padding: spacing.lg, color: colors.black, fontWeight: '600' }}>
              ← Назад
            </div>
          </Link>
        </div>
      </div>
    );
  }

  const item = items[index];
  const attemptsLeft = maxAttempts - wrongCount;

  const isMatch = (value: string) =>
    isDictation ? normalizeSentence(value) === normalizeSentence(item.full) : value.trim() === item.word;

  const finishItem = (wasSolved: boolean) => {
    setChecked(true);
    setSolved(wasSolved);
    if (wasSolved) {
      setCorrectCount((c) => c + 1);
      clearMistake(`ci-${item.id}`);
    }
  };

  const recordWrongAnswer = (guess: string) => {
    recordMistake({
      question_key: `ci-${item.id}`,
      source: 'ci',
      prompt: isDictation ? item.full : item.blanked,
      user_answer: guess,
      correct_answer: isDictation ? item.full : item.word,
    });
  };

  const handleChange = (value: string) => {
    setInput(value);
    if (checked || !isMatch(value)) return;
    finishItem(true);
  };

  const handleCheck = () => {
    if (!input.trim() || checked) return;
    if (isMatch(input)) {
      finishItem(true);
      return;
    }
    recordWrongAnswer(input.trim());
    if (hasAttempts) {
      const nextWrong = wrongCount + 1;
      setWrongCount(nextWrong);
      setInput('');
      if (nextWrong >= maxAttempts) finishItem(false);
    } else {
      finishItem(false);
    }
  };

  const handleDecision = (decision: CiDecision) => {
    onDecide(item, decision);
    setInput('');
    setChecked(false);
    setSolved(false);
    setWrongCount(0);
    setHintOpen(false);
    setTranslationOpen(false);
    if (index < total - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const renderSentence = () =>
    item.blanked.split('____').map((part, i, arr) => (
      <span key={i}>
        {part}
        {i < arr.length - 1 &&
          (solved ? (
            <span style={{ color: RIGHT, fontWeight: 'bold', borderBottom: `2px solid ${RIGHT}` }}>{item.word}</span>
          ) : (
            <span
              style={{
                display: 'inline-block',
                minWidth: '4em',
                textAlign: 'center',
                color: colors.primary,
                fontWeight: '600',
                borderBottom: `2px solid ${colors.primary}`,
              }}
            >
              {input}
            </span>
          ))}
      </span>
    ));

  const decisionButton = (decision: CiDecision, label: string) => (
    <button
      onClick={() => handleDecision(decision)}
      style={{
        flex: 1,
        padding: spacing.lg,
        borderRadius: '12px',
        border: `2px solid ${decision === 'keep' ? colors.primary : colors.gray}`,
        backgroundColor: colors.white,
        color: colors.black,
        fontSize: typography.sizes.sm,
        fontWeight: '600',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );

  const attemptsMessage = hasAttempts && !checked && wrongCount > 0 && (
    <p style={{ fontSize: typography.sizes.sm, color: WRONG, fontWeight: 'bold', margin: `${spacing.sm} 0 0 0` }}>
      Неверно. Осталось попыток: {attemptsLeft}
    </p>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
            <Link href={backHref} style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm }}>
              ← Назад
            </Link>
            <span style={{ fontSize: typography.sizes.sm, opacity: 0.9 }}>
              {title} · {index + 1} / {total}
            </span>
          </div>
          <div style={{ height: '6px', backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', backgroundColor: colors.white, width: `${((index + 1) / total) * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {isDictation ? (
          <div style={cardStyle}>
            <p style={labelStyle}>Прослушайте и впишите предложение целиком</p>
            <button
              onClick={() => playItem(item)}
              style={{ width: '100%', backgroundColor: '#E0F7FA', color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.lg }}
            >
              🔊 Прослушать
            </button>

            <input
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCheck();
              }}
              disabled={checked}
              placeholder="Введите предложение на корейском"
              style={{
                width: '100%',
                padding: spacing.lg,
                borderRadius: '12px',
                border: `2px solid ${checked ? (solved ? RIGHT : WRONG) : colors.gray}`,
                fontSize: typography.sizes.base,
                fontWeight: '600',
                color: colors.primary,
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />

            {attemptsMessage}

            {!checked && (
              <div style={{ marginTop: spacing.md }}>
                {translationOpen ? (
                  <p style={{ fontSize: typography.sizes.sm, color: colors.black, margin: 0 }}>
                    🇷🇺 Перевод: {item.fullRu}
                  </p>
                ) : (
                  <button
                    onClick={() => setTranslationOpen(true)}
                    style={{ background: 'none', border: 'none', color: colors.primary, fontSize: typography.sizes.sm, fontWeight: '600', cursor: 'pointer', padding: 0 }}
                  >
                    🇷🇺 Показать перевод
                  </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div style={cardStyle}>
            {isListen ? (
              <>
                <p style={labelStyle}>Прослушайте и впишите пропущенное слово</p>
                <button
                  onClick={() => playItem(item)}
                  style={{ width: '100%', backgroundColor: '#E0F7FA', color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.lg }}
                >
                  🔊 Прослушать
                </button>
              </>
            ) : (
              <>
                <p style={labelStyle}>Перевод</p>
                <p style={{ fontSize: typography.sizes.base, color: colors.black, lineHeight: '1.6', margin: `0 0 ${spacing.lg} 0` }}>{item.fullRu}</p>
                <p style={labelStyle}>Найдите пропущенное слово на корейском</p>
              </>
            )}

            <p style={{ fontSize: typography.sizes.lg, color: colors.black, fontWeight: '600', lineHeight: '1.9', margin: `0 0 ${spacing.lg} 0` }}>
              {renderSentence()}
            </p>

            <input
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCheck();
              }}
              disabled={checked}
              placeholder="Введите слово на корейском"
              style={{
                width: '100%',
                padding: spacing.lg,
                borderRadius: '12px',
                border: `2px solid ${checked ? (solved ? RIGHT : WRONG) : colors.gray}`,
                fontSize: typography.sizes.base,
                fontWeight: '600',
                color: colors.primary,
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />

            {attemptsMessage}

            {isListen && !checked && (
              <div style={{ marginTop: spacing.md }}>
                {hintOpen ? (
                  <p style={{ fontSize: typography.sizes.sm, color: colors.black, margin: 0 }}>
                    💡 Подсказка: {item.hint}
                  </p>
                ) : (
                  <button
                    onClick={() => setHintOpen(true)}
                    style={{ background: 'none', border: 'none', color: colors.primary, fontSize: typography.sizes.sm, fontWeight: '600', cursor: 'pointer', padding: 0 }}
                  >
                    💡 Показать подсказку
                  </button>
                )}
              </div>
            )}

            {isListen && (
              <div style={{ marginTop: spacing.lg, paddingTop: spacing.lg, borderTop: `1px solid ${colors.gray}` }}>
                <p style={labelStyle}>Перевод</p>
                <p style={{ fontSize: typography.sizes.base, color: colors.black, lineHeight: '1.6', margin: 0 }}>{item.fullRu}</p>
              </div>
            )}
          </div>
        )}

        {checked && (
          <div style={{ ...cardStyle, borderLeft: `4px solid ${solved ? RIGHT : WRONG}` }}>
            <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: solved ? RIGHT : WRONG, margin: `0 0 ${spacing.sm} 0` }}>
              {solved ? 'Правильно!' : isDictation ? 'Правильный ответ:' : `Правильный ответ: ${item.word}`}
            </p>
            <p style={{ fontSize: typography.sizes.base, color: colors.black, lineHeight: '1.7', margin: `0 0 ${spacing.sm} 0` }}>
              {item.full}
              <button
                onClick={() => playItem(item)}
                style={{ marginLeft: spacing.sm, background: 'none', border: 'none', cursor: 'pointer', fontSize: typography.sizes.base }}
              >
                🔊
              </button>
            </p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `0 0 ${spacing.md} 0` }}>
              {item.fullRu}
            </p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `0 0 ${spacing.md} 0` }}>
              {item.word} — {item.translation}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs, marginBottom: spacing.lg }}>
              {item.words.map((w) => (
                <p key={w.surface} style={{ fontSize: typography.sizes.sm, color: colors.black, margin: 0 }}>
                  <strong>{w.surface}</strong> — {w.translation}
                </p>
              ))}
            </div>

            <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: colors.black, margin: `0 0 ${spacing.sm} 0` }}>
              Что сделать с этим предложением?
            </p>
            <div style={{ display: 'flex', gap: spacing.md }}>
              {decisionButton('remove', '🗑 Убрать из теста')}
              {decisionButton('keep', '🔁 Оставить для повторения')}
            </div>
          </div>
        )}

        {!checked && (
          <button
            onClick={handleCheck}
            disabled={!input.trim()}
            style={{ width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: input.trim() ? 'pointer' : 'not-allowed', opacity: input.trim() ? 1 : 0.5 }}
          >
            Проверить
          </button>
        )}
      </div>
    </div>
  );
}
