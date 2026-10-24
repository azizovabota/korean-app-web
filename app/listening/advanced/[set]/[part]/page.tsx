'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { colors, typography, spacing } from '@/constants/colors';
import { getProfile, recordLessonCompleted, recordMistake, type Goal } from '@/lib/account';
import data from '@/data/listeningAdvanced.json';
import { LISTENING_PART_RANGES } from '@/lib/listeningParts';

const RIGHT = '#10B981';

let audioContext: AudioContext | null = null;

function unlockAudio() {
  if (!audioContext) audioContext = new AudioContext();
  audioContext.resume();
}

function playWithGain(src: string, gainDb: number, onEnd?: () => void, playbackRate = QUESTION_PLAYBACK_RATE): HTMLAudioElement {
  const audio = new Audio(src);
  audio.playbackRate = playbackRate;
  if (onEnd) audio.onended = onEnd;
  audio.onerror = () => onEnd?.();
  if (audioContext && audioContext.state === 'running' && Math.abs(gainDb) > 0.5) {
    const gain = audioContext.createGain();
    gain.gain.value = Math.pow(10, gainDb / 20);
    audioContext.createMediaElementSource(audio).connect(gain).connect(audioContext.destination);
  }
  audio.play().catch(() => undefined);
  return audio;
}
const QUESTION_PLAYBACK_RATE = 0.9;
const WRONG = '#EF4444';

type Phase = 'rule' | 'question' | 'done';

export default function ListeningSetPage() {
  const params = useParams();
  const setNumber = Number(params.set);
  const lesson = data.lessons.find((l) => l.number === setNumber);
  const partNo = Number(params.part);
  const [partFrom, partTo] = LISTENING_PART_RANGES[partNo - 1] ?? [0, 0];
  const sections = (lesson?.sections ?? []).filter((x) => x.start >= partFrom && x.end <= partTo);
  const questions = (lesson?.questions ?? []).filter((q) => q.number >= partFrom && q.number <= partTo);

  const [goal, setGoal] = useState<Goal | null | undefined>(undefined);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('rule');
  const [ruleEnded, setRuleEnded] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    getProfile().then((p) => setGoal(p?.goal ?? null));
  }, []);

  const section = sections[sectionIdx];
  const sectionQuestions = lesson && section
    ? questions.filter((q) => q.number >= section.start && q.number <= section.end)
    : [];
  const question = sectionQuestions[qIdx];

  const playRule = (ruleId: string, onEnd: () => void) => {
    audioRef.current?.pause();
    audioRef.current = playWithGain(`/audio/listening/rules/${ruleId}.m4a`, 0, onEnd, 1);
  };

  const playQuestion = (q: { segments: { file: string; gainDb?: number }[] }) => {
    audioRef.current?.pause();
    let i = 0;
    const playNext = () => {
      if (i >= q.segments.length) return;
      const seg = q.segments[i];
      i += 1;
      audioRef.current = playWithGain(`/audio/listening/q/${seg.file}`, seg.gainDb ?? 0, playNext);
    };
    playNext();
  };

  useEffect(() => {
    if (phase !== 'rule' || !section) return;
    setRuleEnded(false);
    playRule(section.ruleId, () => setRuleEnded(true));
    return () => audioRef.current?.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, sectionIdx]);

  useEffect(() => {
    if (phase !== 'question' || !question) return;
    const next = sectionQuestions[qIdx + 1];
    [question, next].forEach((q) => {
      q?.segments.forEach((seg: { file: string }) => {
        const preload = new Audio();
        preload.preload = 'auto';
        preload.src = `/audio/listening/q/${seg.file}`;
      });
    });
    playQuestion(question);
    return () => audioRef.current?.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, question?.id]);

  if (!lesson) {
    return <p style={{ padding: spacing.lg }}>Набор не найден</p>;
  }
  if (goal === undefined) return null;
  if (goal !== 'topik_5_6') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, padding: spacing.lg }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginTop: spacing.xl }}>
          <p style={{ fontSize: typography.sizes.base, color: colors.black }}>Скоро появится</p>
          <Link href={`/listening/advanced/${setNumber}`} style={{ color: colors.primary }}>← К наборам</Link>
        </div>
      </div>
    );
  }

  const total = questions.length;
  const lessonKey = `listening56-${lesson.number}-p${partNo}`;

  const startSection = () => {
    unlockAudio();
    setPhase('question');
    setQIdx(0);
    setSelected(null);
  };

  const answer = (i: number) => {
    if (selected !== null || !question) return;
    setSelected(i);
    const key = `listening56-${question.id}`;
    if (i === question.correct) {
      setCorrectCount((c) => c + 1);
    } else {
      recordMistake({
        question_key: key,
        source: 'listening56',
        prompt: question.prompt,
        user_answer: question.options[i],
        correct_answer: question.options[question.correct],
      });
    }
  };

  const next = () => {
    if (!section) return;
    setSelected(null);
    if (qIdx < sectionQuestions.length - 1) {
      setQIdx(qIdx + 1);
      return;
    }
    if (sectionIdx < sections.length - 1) {
      setSectionIdx(sectionIdx + 1);
      setQIdx(0);
      setPhase('rule');
      return;
    }
    recordLessonCompleted(lessonKey, correctCount, total);
    setPhase('done');
  };

  const header = (
    <div style={{ background: colors.gradient, color: colors.white, padding: `${spacing.xl} ${spacing.lg}`, borderRadius: '0 0 24px 24px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg }}>
          <Link href={`/listening/advanced/${setNumber}`} style={{ color: colors.white, textDecoration: 'none', fontSize: typography.sizes.sm }}>← Наборы</Link>
          {phase !== 'done' && section && (
            <span style={{ fontSize: typography.sizes.sm, opacity: 0.9 }}>
              Listening {lesson.number} · Question-{partNo} · раздел {sectionIdx + 1}/{sections.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (phase === 'done') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
        {header}
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, textAlign: 'center' }}>
          <p style={{ fontSize: typography.sizes['3xl'], fontWeight: 'bold', color: colors.black, margin: `${spacing.xl} 0 ${spacing.sm} 0` }}>
            {correctCount} / {total}
          </p>
          <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, marginBottom: spacing.xl }}>правильных ответов</p>
          <Link href={`/listening/advanced/${setNumber}`} style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{ background: colors.gradient, color: colors.white, borderRadius: '12px', padding: spacing.lg, fontWeight: '600' }}>← К наборам</div>
          </Link>
        </div>
      </div>
    );
  }

  const cardStyle = { backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, marginBottom: spacing.lg, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' };
  const buttonStyle = { width: '100%', background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600' as const, cursor: 'pointer' };

  if (phase === 'rule' && section) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
        {header}
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
          <div style={cardStyle}>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, fontWeight: 'bold', margin: `0 0 ${spacing.md} 0` }}>
              Правило раздела · {section.start === section.end ? `вопрос ${section.start}` : `вопросы ${section.start}–${section.end}`}
            </p>
            <p style={{ fontSize: typography.sizes.lg, color: colors.black, fontWeight: '600', lineHeight: '1.8', margin: `0 0 ${spacing.lg} 0` }}>
              {section.instruction}
            </p>
            <button
              onClick={() => {
                unlockAudio();
                setRuleEnded(false);
                playRule(section.ruleId, () => setRuleEnded(true));
              }}
              style={{ width: '100%', backgroundColor: '#F3E8FF', color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: 'pointer' }}
            >
              🔊 Прослушать правило
            </button>
          </div>
          <button onClick={startSection} disabled={!ruleEnded} style={{ ...buttonStyle, opacity: ruleEnded ? 1 : 0.5, cursor: ruleEnded ? 'pointer' : 'not-allowed' }}>
            {ruleEnded ? 'Начать вопросы →' : 'Слушайте правило...'}
          </button>
        </div>
      </div>
    );
  }

  if (!question) return null;
  const answered = selected !== null;
  const isRight = answered && selected === question.correct;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
      {header}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, fontWeight: 'bold', margin: `0 0 ${spacing.md} 0` }}>
          Вопрос {question.number} из {total}
        </p>

        <div style={cardStyle}>
          <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: `0 0 ${spacing.md} 0` }}>Прослушайте и выберите ответ</p>
          <button
            onClick={() => {
              unlockAudio();
              playQuestion(question);
            }}
            style={{ width: '100%', backgroundColor: '#F3E8FF', color: colors.primary, border: `2px solid ${colors.primary}`, borderRadius: '12px', padding: spacing.lg, fontSize: typography.sizes.base, fontWeight: '600', cursor: 'pointer', marginBottom: spacing.lg }}
          >
            🔊 Прослушать ещё раз
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm, marginBottom: spacing.lg }}>
            {question.display.map((line, i) => (
              <p key={i} style={{ fontSize: typography.sizes.base, color: colors.black, fontWeight: '600', lineHeight: '1.8', margin: 0 }}>
                {line}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            {question.options.map((option, i) => {
              let border = colors.gray;
              let background = colors.white;
              if (answered && i === question.correct) {
                border = RIGHT;
                background = '#ECFDF5';
              } else if (answered && i === selected) {
                border = WRONG;
                background = '#FEF2F2';
              }
              return (
                <button
                  key={i}
                  onClick={() => answer(i)}
                  disabled={answered}
                  style={{ padding: spacing.lg, borderRadius: '12px', border: `2px solid ${border}`, backgroundColor: background, color: colors.black, fontSize: typography.sizes.sm, textAlign: 'left', cursor: answered ? 'default' : 'pointer' }}
                >
                  <span style={{ fontWeight: 'bold', marginRight: spacing.md }}>{String.fromCharCode(65 + i)}</span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {answered && (
          <div style={{ ...cardStyle, borderLeft: `4px solid ${isRight ? RIGHT : WRONG}` }}>
            <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: isRight ? RIGHT : WRONG, margin: `0 0 ${spacing.sm} 0` }}>
              {isRight ? 'Правильно!' : 'Неправильно'}
            </p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.black, lineHeight: '1.6', margin: 0 }}>{question.explanation}</p>
          </div>
        )}

        {answered && (
          <button onClick={next} style={buttonStyle}>
            {qIdx === sectionQuestions.length - 1 && sectionIdx === sections.length - 1 ? 'Завершить' : qIdx === sectionQuestions.length - 1 ? 'Следующий раздел →' : 'Далее →'}
          </button>
        )}
      </div>
    </div>
  );
}
