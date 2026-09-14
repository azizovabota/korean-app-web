'use client';

import { useState } from 'react';
import Link from 'next/link';
import { colors, typography, spacing } from '@/constants/colors';

interface Question {
  prompt_text: string;
  options: Array<{ key: string; text: string }>;
  correct_option: string;
  explanation: string;
  difficulty: number;
  skill_area: string;
}

export default function AdminPage() {
  const [mode, setMode] = useState<'form' | 'csv'>('form');
  const [formData, setFormData] = useState<Question>({
    prompt_text: '',
    options: [
      { key: '1', text: '' },
      { key: '2', text: '' },
      { key: '3', text: '' },
      { key: '4', text: '' },
    ],
    correct_option: '1',
    explanation: '',
    difficulty: 2,
    skill_area: 'vocabulary',
  });
  const [csvText, setCsvText] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddQuestion = async () => {
    if (!formData.prompt_text || !formData.explanation) {
      setMessage('❌ Заполни все поля');
      return;
    }

    setLoading(true);
    setMessage('Загружаю...');

    try {
      const response = await fetch('/api/admin/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Ошибка загрузки');

      setMessage('✅ Вопрос добавлен!');
      setFormData({
        prompt_text: '',
        options: [
          { key: '1', text: '' },
          { key: '2', text: '' },
          { key: '3', text: '' },
          { key: '4', text: '' },
        ],
        correct_option: '1',
        explanation: '',
        difficulty: 2,
        skill_area: 'vocabulary',
      });
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCSV = async () => {
    if (!csvText.trim()) {
      setMessage('❌ Вставь CSV данные');
      return;
    }

    setLoading(true);
    setMessage('Обработка CSV...');

    try {
      const lines = csvText.trim().split('\n');
      const headers = lines[0].split(',').map((h) => h.trim());
      const questions: Question[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map((v) => v.trim());
        if (values.length < 7) continue;

        questions.push({
          prompt_text: values[0],
          options: [
            { key: '1', text: values[1] },
            { key: '2', text: values[2] },
            { key: '3', text: values[3] },
            { key: '4', text: values[4] },
          ],
          correct_option: values[5],
          explanation: values[6],
          difficulty: parseInt(values[7] || '2'),
          skill_area: values[8] || 'vocabulary',
        });
      }

      const response = await fetch('/api/admin/questions/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions }),
      });

      if (!response.ok) throw new Error('Ошибка загрузки');
      const result = await response.json();

      setMessage(`✅ Загружено ${result.count} вопросов!`);
      setCsvText('');
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, padding: spacing.lg }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: spacing.xl }}>
          <Link href="/">
            <button
              style={{
                backgroundColor: colors.lightGray,
                color: colors.black,
                border: `1px solid ${colors.gray}`,
                borderRadius: '8px',
                padding: `${spacing.sm} ${spacing.lg}`,
                fontSize: typography.sizes.sm,
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: spacing.lg,
              }}
            >
              ← Назад
            </button>
          </Link>

          <h1
            style={{
              fontSize: typography.sizes['2xl'],
              fontWeight: 'bold',
              color: colors.black,
              marginBottom: spacing.md,
            }}
          >
            Админ Панель 🔧
          </h1>
          <p style={{ fontSize: typography.sizes.base, color: colors.darkGray }}>
            Загруз вопросы в TOPIK базу
          </p>
        </div>

        {message && (
          <div
            style={{
              backgroundColor: message.includes('✅') ? '#D1FAE5' : '#FEE2E2',
              color: message.includes('✅') ? '#065F46' : '#991B1B',
              borderRadius: '8px',
              padding: spacing.md,
              marginBottom: spacing.lg,
              fontSize: typography.sizes.sm,
            }}
          >
            {message}
          </div>
        )}

        <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.xl }}>
          <button
            onClick={() => setMode('form')}
            style={{
              flex: 1,
              backgroundColor: mode === 'form' ? colors.primary : colors.white,
              color: mode === 'form' ? colors.white : colors.black,
              border: `2px solid ${colors.primary}`,
              borderRadius: '8px',
              padding: spacing.md,
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            📝 Одиночный вопрос
          </button>
          <button
            onClick={() => setMode('csv')}
            style={{
              flex: 1,
              backgroundColor: mode === 'csv' ? colors.primary : colors.white,
              color: mode === 'csv' ? colors.white : colors.black,
              border: `2px solid ${colors.primary}`,
              borderRadius: '8px',
              padding: spacing.md,
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            📊 Bulk Upload (CSV)
          </button>
        </div>

        {mode === 'form' ? (
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: '12px',
              padding: spacing.lg,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ marginBottom: spacing.lg }}>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: '600', color: colors.black }}>
                Вопрос
              </label>
              <textarea
                value={formData.prompt_text}
                onChange={(e) =>
                  setFormData({ ...formData, prompt_text: e.target.value })
                }
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  border: `1px solid ${colors.gray}`,
                  padding: spacing.md,
                  fontSize: typography.sizes.sm,
                  marginTop: spacing.sm,
                  fontFamily: 'inherit',
                  minHeight: '80px',
                  color: colors.black,
                  backgroundColor: colors.white,
                }}
                placeholder="Введи вопрос на корейском"
              />
            </div>

            <div style={{ marginBottom: spacing.lg }}>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: '600', color: colors.black }}>
                Варианты ответов
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.sm, marginTop: spacing.sm }}>
                {formData.options.map((opt, idx) => (
                  <input
                    key={opt.key}
                    type="text"
                    value={opt.text}
                    onChange={(e) => {
                      const newOptions = [...formData.options];
                      newOptions[idx].text = e.target.value;
                      setFormData({ ...formData, options: newOptions });
                    }}
                    style={{
                      borderRadius: '8px',
                      border: `1px solid ${colors.gray}`,
                      padding: spacing.md,
                      fontSize: typography.sizes.sm,
                      color: colors.black,
                      backgroundColor: colors.white,
                    }}
                    placeholder={`Вариант ${opt.key}`}
                  />
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: spacing.md, marginBottom: spacing.lg }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: '600', color: colors.black }}>
                  Правильный ответ
                </label>
                <select
                  value={formData.correct_option}
                  onChange={(e) =>
                    setFormData({ ...formData, correct_option: e.target.value })
                  }
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    border: `1px solid ${colors.gray}`,
                    padding: spacing.md,
                    fontSize: typography.sizes.sm,
                    marginTop: spacing.sm,
                    color: colors.black,
                    backgroundColor: colors.white,
                  }}
                >
                  {formData.options.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      Вариант {opt.key}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: '600', color: colors.black }}>
                  Сложность
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) =>
                    setFormData({ ...formData, difficulty: parseInt(e.target.value) })
                  }
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    border: `1px solid ${colors.gray}`,
                    padding: spacing.md,
                    fontSize: typography.sizes.sm,
                    marginTop: spacing.sm,
                    color: colors.black,
                    backgroundColor: colors.white,
                  }}
                >
                  {[1, 2, 3, 4, 5].map((d) => (
                    <option key={d} value={d}>
                      {'⭐'.repeat(d)}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ fontSize: typography.sizes.sm, fontWeight: '600', color: colors.black }}>
                  Тип
                </label>
                <select
                  value={formData.skill_area}
                  onChange={(e) =>
                    setFormData({ ...formData, skill_area: e.target.value })
                  }
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    border: `1px solid ${colors.gray}`,
                    padding: spacing.md,
                    fontSize: typography.sizes.sm,
                    marginTop: spacing.sm,
                    color: colors.black,
                    backgroundColor: colors.white,
                  }}
                >
                  <option value="vocabulary">Словарь</option>
                  <option value="grammar">Грамматика</option>
                  <option value="reading_comprehension">Чтение</option>
                  <option value="listening_comprehension">Аудирование</option>
                  <option value="content_structure">Структура</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: spacing.lg }}>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: '600', color: colors.black }}>
                Объяснение
              </label>
              <textarea
                value={formData.explanation}
                onChange={(e) =>
                  setFormData({ ...formData, explanation: e.target.value })
                }
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  border: `1px solid ${colors.gray}`,
                  padding: spacing.md,
                  fontSize: typography.sizes.sm,
                  marginTop: spacing.sm,
                  fontFamily: 'inherit',
                  minHeight: '60px',
                }}
                placeholder="Почему это правильный ответ?"
              />
            </div>

            <button
              onClick={handleAddQuestion}
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none',
                borderRadius: '8px',
                padding: `${spacing.md} ${spacing.lg}`,
                fontSize: typography.sizes.base,
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Загружаю...' : 'Добавить вопрос ✅'}
            </button>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: '12px',
              padding: spacing.lg,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ marginBottom: spacing.lg }}>
              <label style={{ fontSize: typography.sizes.sm, fontWeight: '600', color: colors.black }}>
                CSV Формат (вставь данные)
              </label>
              <p
                style={{
                  fontSize: typography.sizes.xs,
                  color: colors.darkGray,
                  marginTop: spacing.sm,
                }}
              >
                prompt_text,option1,option2,option3,option4,correct,explanation,difficulty,skill_area
              </p>
              <textarea
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  border: `1px solid ${colors.gray}`,
                  padding: spacing.md,
                  fontSize: typography.sizes.sm,
                  marginTop: spacing.sm,
                  fontFamily: 'monospace',
                  minHeight: '300px',
                  color: colors.black,
                  backgroundColor: colors.white,
                }}
                placeholder={`Вопрос 1,Вариант 1,Вариант 2,Вариант 3,Вариант 4,1,Объяснение,2,vocabulary
Вопрос 2,Вариант 1,Вариант 2,Вариант 3,Вариант 4,2,Объяснение,2,grammar`}
              />
            </div>

            <button
              onClick={handleUploadCSV}
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none',
                borderRadius: '8px',
                padding: `${spacing.md} ${spacing.lg}`,
                fontSize: typography.sizes.base,
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Загружаю...' : 'Загрузить CSV 📊'}
            </button>
          </div>
        )}

        <div
          style={{
            marginTop: spacing.xl,
            backgroundColor: '#FFF9E6',
            borderRadius: '8px',
            padding: spacing.md,
            borderLeft: `4px solid ${colors.accent}`,
            fontSize: typography.sizes.sm,
            color: colors.black,
          }}
        >
          <p style={{ marginBottom: spacing.sm }}>
            💡 <strong>Подсказка:</strong> Для быстрой загрузки многих вопросов используй CSV режим.
          </p>
          <p>
            <strong>API:</strong> /api/admin/questions (POST) - добавить один вопрос
            <br />
            <strong>API:</strong> /api/admin/questions/bulk (POST) - массовая загрузка
          </p>
        </div>
      </div>
    </div>
  );
}
