'use client';

import Link from 'next/link';
import { useState } from 'react';
import { colors, typography, spacing } from '@/constants/colors';
import { readingLessons } from '@/data/readingLessons';
import { useParams } from 'next/navigation';

export default function TestPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;
  const lesson = readingLessons.find((l) => l.id === lessonId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(lesson?.test.length || 0).fill(null));
  const [showResults, setShowResults] = useState(false);

  if (!lesson) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, paddingBottom: '80px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg, textAlign: 'center', marginTop: spacing.xl }}>
          <p style={{ fontSize: typography.sizes.base, color: colors.black }}>Lesson not found</p>
        </div>
      </div>
    );
  }

  const currentQuestion = lesson.test[currentQuestionIndex];
  const correctAnswersCount = answers.filter((answer, idx) => answer === lesson.test[idx].correctAnswer).length;
  const percentage = Math.round((correctAnswersCount / lesson.test.length) * 100);

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < lesson.test.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (showResults) {
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
            <h1 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', margin: 0, marginBottom: spacing.sm }}>
              ✅ Результаты Теста
            </h1>
            <p style={{ fontSize: typography.sizes.sm, opacity: 0.9, margin: 0 }}>
              테스트 결과
            </p>
          </div>
        </div>

        {/* Results */}
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
          {/* Score Circle */}
          <div style={{ textAlign: 'center', marginBottom: spacing.xl }}>
            <div
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: `conic-gradient(${percentage >= 70 ? '#10B981' : percentage >= 50 ? '#F59E0B' : '#EF4444'} 0%, ${percentage >= 70 ? '#10B981' : percentage >= 50 ? '#F59E0B' : '#EF4444'} ${percentage}%, ${colors.gray} ${percentage}%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
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
                  {percentage}%
                </p>
                <p style={{ fontSize: typography.sizes.sm, color: colors.primary, margin: `${spacing.sm} 0 0 0` }}>
                  {correctAnswersCount}/{lesson.test.length}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div
            style={{
              backgroundColor: '#F3E8FF',
              borderRadius: '12px',
              padding: spacing.lg,
              marginBottom: spacing.xl,
              textAlign: 'center',
              borderLeft: `4px solid ${colors.primary}`,
            }}
          >
            <p style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0, marginBottom: spacing.sm }}>
              {percentage >= 70 ? '🎉 Отлично!' : percentage >= 50 ? '👍 Хорошо!' : '📚 Продолжай учиться!'}
            </p>
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0 }}>
              {percentage >= 70 ? 'Ты хорошо усвоил материал!' : percentage >= 50 ? 'Неплохо, но можно лучше!' : 'Повтори материал и пробуй снова!'}
            </p>
          </div>

          {/* Review Button */}
          <button
            onClick={() => {
              setCurrentQuestionIndex(0);
              setShowResults(false);
              setAnswers(new Array(lesson.test.length).fill(null));
            }}
            style={{
              width: '100%',
              background: colors.gradient,
              color: colors.white,
              border: 'none',
              borderRadius: '12px',
              padding: spacing.lg,
              fontSize: typography.sizes.base,
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: spacing.lg,
            }}
          >
            Пройти тест заново
          </button>

          <Link href={`/reading/${lessonId}`} style={{ display: 'block' }}>
            <button
              style={{
                width: '100%',
                backgroundColor: colors.white,
                color: colors.black,
                border: `2px solid ${colors.primary}`,
                borderRadius: '12px',
                padding: spacing.lg,
                fontSize: typography.sizes.base,
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              ← Назад к уроку
            </button>
          </Link>
        </div>
      </div>
    );
  }

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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg }}>
            <h1 style={{ fontSize: typography.sizes.lg, fontWeight: 'bold', margin: 0 }}>
              ✅ Тест
            </h1>
            <div style={{ fontSize: typography.sizes.sm, opacity: 0.9 }}>
              {currentQuestionIndex + 1} / {lesson.test.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div
            style={{
              height: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                backgroundColor: colors.white,
                width: `${((currentQuestionIndex + 1) / lesson.test.length) * 100}%`,
                transition: 'width 0.3s',
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: spacing.lg }}>
        {/* Question */}
        <div
          style={{
            backgroundColor: colors.white,
            borderRadius: '16px',
            padding: spacing.lg,
            marginBottom: spacing.xl,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0, marginBottom: spacing.lg, fontWeight: 'bold' }}>
            Вопрос #{currentQuestionIndex + 1}
          </p>
          <h3 style={{ fontSize: typography.sizes.base, fontWeight: 'bold', color: colors.black, margin: 0, marginBottom: spacing.lg, lineHeight: '1.6' }}>
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswerSelect(idx)}
                style={{
                  padding: spacing.lg,
                  borderRadius: '12px',
                  border: `2px solid ${answers[currentQuestionIndex] === idx ? colors.primary : colors.gray}`,
                  backgroundColor: answers[currentQuestionIndex] === idx ? '#F3E8FF' : colors.white,
                  color: colors.black,
                  fontSize: typography.sizes.sm,
                  fontWeight: answers[currentQuestionIndex] === idx ? '600' : '400',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: answers[currentQuestionIndex] === idx ? colors.primary : colors.gray,
                      color: colors.white,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: typography.sizes.xs,
                      fontWeight: 'bold',
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: spacing.lg }}>
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            style={{
              flex: 1,
              padding: spacing.lg,
              backgroundColor: colors.white,
              color: colors.black,
              border: `2px solid ${colors.primary}`,
              borderRadius: '12px',
              fontSize: typography.sizes.base,
              fontWeight: '600',
              cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
              opacity: currentQuestionIndex === 0 ? 0.5 : 1,
            }}
          >
            ← Назад
          </button>
          <button
            onClick={handleNext}
            disabled={answers[currentQuestionIndex] === null}
            style={{
              flex: 1,
              padding: spacing.lg,
              background: colors.gradient,
              color: colors.white,
              border: 'none',
              borderRadius: '12px',
              fontSize: typography.sizes.base,
              fontWeight: '600',
              cursor: answers[currentQuestionIndex] === null ? 'not-allowed' : 'pointer',
              opacity: answers[currentQuestionIndex] === null ? 0.5 : 1,
            }}
          >
            {currentQuestionIndex === lesson.test.length - 1 ? 'Завершить' : 'Далее'} →
          </button>
        </div>
      </div>
    </div>
  );
}
