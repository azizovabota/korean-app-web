'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';
import { getDueMistakes, recordReviewResult, type MistakeRow } from '@/lib/account';
import topik from '@/data/topikBeginnerReading.json';
import topikIntermediate from '@/data/topikIntermediateReading.json';
import topikAdvanced from '@/data/topikAdvancedReading.json';
import listening from '@/data/listeningTopik.json';
import listeningIntermediate from '@/data/listeningIntermediate.json';
import ci from '@/data/ciBeginner.json';

type ChoiceItem = {
  key: string;
  kind: 'choice';
  prompt: string;
  options: string[];
  correct: number;
  explanation: string;
  audio: string[];
};

type TypedItem = {
  key: string;
  kind: 'typed';
  mode: 'word' | 'full';
  blanked: string;
  word: string;
  full: string;
  fullRu: string;
  audio: string;
};

type ReviewItem = ChoiceItem | TypedItem;

const RIGHT = '#10B981';
const WRONG = '#EF4444';

function stemOf(text: string) {
  return text
    .split(/\n| \/ /)
    .filter((part) => !/고르십시오|고르세요/.test(part))
    .join('\n');
}

function buildItem(row: MistakeRow): ReviewItem | null {
  const key = row.question_key;

  if (/^topik(12|34|56)-/.test(key)) {
    const [, lessonNo, questionNo] = key.split('-');
    const source = key.startsWith('topik56-') ? topikAdvanced : key.startsWith('topik34-') ? topikIntermediate : topik;
    const lesson = source.lessons.find((l) => l.number === Number(lessonNo));
    const q = lesson?.questions.find((x) => x.number === Number(questionNo));
    if (!q) return null;
    return { key, kind: 'choice', prompt: stemOf(q.prompt), options: q.options, correct: q.correct, explanation: q.explanation, audio: [] };
  }

  if (key.startsWith('listening-') || key.startsWith('listening34-')) {
    const id = key.replace(/^listening(34)?-/, '');
    const source = key.startsWith('listening34-') ? listeningIntermediate : listening;
    const q = source.lessons.flatMap((l) => l.questions).find((x) => x.id === id);
    if (!q) return null;
    return {
      key,
      kind: 'choice',
      prompt: q.display.join('\n'),
      options: q.options,
      correct: q.correct,
      explanation: q.explanation,
      audio: q.segments.map((s) => `/audio/listening/q/${s.file}`),
    };
  }

  if (key.startsWith('ci-')) {
    const id = key.replace('ci-', '');
    const item = ci.lessons.flatMap((l) => l.items).find((x) => x.id === id);
    if (!item) return null;
    return {
      key,
      kind: 'typed',
      mode: row.correct_answer === item.full ? 'full' : 'word',
      blanked: item.blanked,
      word: item.word,
      full: item.full,
      fullRu: item.fullRu,
      audio: `/audio/ci/${item.id}.mp3`,
    };
  }

  return null;
}

function playSequence(files: string[], rate: number) {
  let i = 0;
  const next = () => {
    if (i >= files.length) return;
    const audio = new Audio(files[i]);
    i += 1;
    audio.playbackRate = rate;
    audio.onended = next;
    audio.onerror = next;
    audio.play().catch(() => undefined);
  };
  next();
  return () => undefined;
}

function playOne(file: string, rate: number) {
  const audio = new Audio(file);
  audio.playbackRate = rate;
  audio.play().catch(() => undefined);
}

export default function ReviewPage() {
  const [queue, setQueue] = useState<ReviewItem[] | null>(null);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [solved, setSolved] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    getDueMistakes().then((rows) => {
      const items = rows.map(buildItem).filter((x): x is ReviewItem => x !== null);
      setQueue(items);
    });
  }, []);

  const item = queue?.[index];

  useEffect(() => {
    if (!item || item.kind !== 'choice' || item.audio.length === 0) return;
    const stopNext = playSequence(item.audio, 0.9);
    return stopNext;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, queue]);

  const cardStyle = { backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, marginBottom: spacing.lg, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' };
  const primaryButton = { width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600' as const, cursor: 'pointer' };

  const header = (
    <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/my-study" style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm }}>← Моё обучение</Link>
        {queue && queue.length > 0 && !finished && (
          <span style={{ fontSize: typography.sizes.sm, opacity: 0.9 }}>{index + 1} / {queue.length}</span>
        )}
      </div>
    </div>
  );

  if (queue === null) {
    return <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray }}>{header}</div>;
  }

  if (queue.length === 0 || finished) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
        {header}
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, textAlign: 'center' }}>
          {finished ? (
            <>
              <p style={{ fontSize: typography.sizes['3xl'], fontWeight: 'bold', color: colors.black, margin: `${spacing.xl} 0 ${spacing.sm} 0` }}>{correctCount} / {queue.length}</p>
              <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, marginBottom: spacing.xl }}>правильных ответов</p>
            </>
          ) : (
            <p style={{ fontSize: typography.sizes.base, color: colors.black, margin: `${spacing.xl} 0` }}>Сегодня повторять нечего. Новые ошибки появятся здесь, когда придёт время их повторить.</p>
          )}
          <Link href="/my-study" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ border: `2px solid ${colors.primary}`, borderRadius: '12px', padding: spacing.lg, color: colors.black, fontWeight: '600' }}>← Моё обучение</div>
          </Link>
        </div>
      </div>
    );
  }

  if (!item) return null;

  const next = () => {
    audioRef.current?.pause();
    setSelected(null);
    setInput('');
    setChecked(false);
    setSolved(false);
    if (index < queue.length - 1) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (item.kind === 'choice') {
    const answered = selected !== null;
    const isRight = answered && selected === item.correct;

    const answer = (i: number) => {
      if (answered) return;
      setSelected(i);
      if (i === item.correct) setCorrectCount((c) => c + 1);
      recordReviewResult(item.key, i === item.correct);
    };

    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
        {header}
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
          <div style={cardStyle}>
            {item.audio.length > 0 && (
              <button
                onClick={() => playSequence(item.audio, 0.9)}
                style={{ width: '100%', backgroundColor: '#F3E8FF', color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.lg }}
              >
                🔊 Прослушать ещё раз
              </button>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm, marginBottom: spacing.lg }}>
              {item.prompt.split('\n').map((line, i) => (
                <p key={i} style={{ fontSize: typography.sizes.base, color: colors.black, fontWeight: '600', lineHeight: '1.8', margin: 0 }}>{line}</p>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
              {item.options.map((option, i) => {
                let border = colors.gray;
                let background = colors.white;
                if (answered && i === item.correct) {
                  border = RIGHT;
                  background = '#ECFDF5';
                } else if (answered && i === selected) {
                  border = WRONG;
                  background = '#FEF2F2';
                }
                return (
                  <button key={i} onClick={() => answer(i)} disabled={answered} style={{ padding: spacing.lg, borderRadius: '12px', border: `2px solid ${border}`, backgroundColor: background, color: colors.black, fontSize: typography.sizes.sm, textAlign: 'left', cursor: answered ? 'default' : 'pointer' }}>
                    <span style={{ fontWeight: 'bold', marginRight: spacing.md }}>{String.fromCharCode(65 + i)}</span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {answered && (
            <div style={{ ...cardStyle, borderLeft: `4px solid ${isRight ? RIGHT : WRONG}` }}>
              <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: isRight ? RIGHT : WRONG, margin: `0 0 ${spacing.sm} 0` }}>{isRight ? 'Правильно!' : 'Неправильно'}</p>
              <p style={{ fontSize: typography.sizes.sm, color: colors.black, lineHeight: '1.6', margin: 0 }}>{item.explanation}</p>
            </div>
          )}

          {answered && <button onClick={next} style={primaryButton}>Далее →</button>}
        </div>
      </div>
    );
  }

  const isRight = checked && solved;

  const check = () => {
    if (!input.trim() || checked) return;
    const target = item.mode === 'full' ? item.full.replace(/[\s.,!?'"]/g, '') : item.word;
    const guess = item.mode === 'full' ? input.replace(/[\s.,!?'"]/g, '') : input.trim();
    const ok = guess === target;
    setChecked(true);
    setSolved(ok);
    if (ok) setCorrectCount((c) => c + 1);
    recordReviewResult(item.key, ok);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      {header}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        <div style={cardStyle}>
          <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, fontWeight: 'bold', margin: `0 0 ${spacing.md} 0` }}>
            {item.mode === 'full' ? 'Прослушайте и впишите предложение целиком' : 'Найдите пропущенное слово на корейском'}
          </p>
          {item.mode === 'full' ? (
            <button onClick={() => playOne(item.audio, 0.85)} style={{ width: '100%', backgroundColor: '#F3E8FF', color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.lg }}>
              🔊 Прослушать
            </button>
          ) : (
            <>
              <p style={{ fontSize: typography.sizes.base, color: colors.black, fontWeight: '600', marginBottom: spacing.sm }}>Перевод: {item.fullRu}</p>
              <p style={{ fontSize: typography.sizes.lg, color: colors.black, fontWeight: '600', lineHeight: '1.9', margin: `0 0 ${spacing.lg} 0` }}>{item.blanked}</p>
            </>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') check();
            }}
            disabled={checked}
            placeholder={item.mode === 'full' ? 'Введите предложение' : 'Введите слово'}
            style={{ width: '100%', padding: spacing.lg, borderRadius: '12px', border: `2px solid ${checked ? (isRight ? RIGHT : WRONG) : colors.gray}`, fontSize: typography.sizes.base, fontWeight: '600', color: colors.primary, boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        {checked && (
          <div style={{ ...cardStyle, borderLeft: `4px solid ${isRight ? RIGHT : WRONG}` }}>
            <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: isRight ? RIGHT : WRONG, margin: `0 0 ${spacing.sm} 0` }}>{isRight ? 'Правильно!' : 'Неправильно'}</p>
            <p style={{ fontSize: typography.sizes.base, color: colors.black, lineHeight: '1.7', margin: `0 0 ${spacing.sm} 0` }}>{item.full}</p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0 }}>{item.fullRu}</p>
          </div>
        )}

        {!checked ? (
          <button onClick={check} disabled={!input.trim()} style={{ ...primaryButton, opacity: input.trim() ? 1 : 0.5 }}>Проверить</button>
        ) : (
          <button onClick={next} style={primaryButton}>Далее →</button>
        )}
      </div>
    </div>
  );
}
