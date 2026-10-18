'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { goalLabels, type Goal } from '@/lib/account';
import { colors, typography, spacing } from '@/constants/colors';

const goals: Goal[] = ['topik_1_2', 'topik_3_4', 'topik_5_6'];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [goal, setGoal] = useState<Goal>('topik_1_2');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');
    if (!name.trim() || !email.trim() || password.length < 6) {
      setError('Заполните имя, email и пароль (не короче 6 символов)');
      return;
    }
    setLoading(true);
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { data: { name: name.trim() } },
    });
    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }
    if (data.user && data.session) {
      await supabase.from('profiles').upsert({ id: data.user.id, name: name.trim(), goal });
      router.replace('/');
    } else {
      setError('Аккаунт создан. Подтвердите email и войдите.');
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: spacing.md,
    borderRadius: '10px',
    border: `1px solid ${colors.gray}`,
    fontSize: typography.sizes.base,
    color: colors.black,
    boxSizing: 'border-box' as const,
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, padding: spacing.lg }}>
      <div style={{ maxWidth: '420px', margin: '0 auto', paddingTop: spacing.xl }}>
        <h1 style={{ fontSize: typography.sizes['2xl'], fontWeight: 'bold', color: colors.black, marginBottom: spacing.lg }}>
          Регистрация
        </h1>

        <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          <input style={inputStyle} placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
          <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={inputStyle} type="password" placeholder="Пароль (не короче 6 символов)" value={password} onChange={(e) => setPassword(e.target.value)} />

          <p style={{ fontSize: typography.sizes.sm, fontWeight: 'bold', color: colors.black, margin: `${spacing.sm} 0 0 0` }}>Цель: какой уровень хотите сдать</p>
          {goals.map((g) => (
            <button
              key={g}
              onClick={() => setGoal(g)}
              style={{
                padding: spacing.lg,
                borderRadius: '12px',
                border: `2px solid ${goal === g ? colors.primary : colors.gray}`,
                backgroundColor: goal === g ? '#E0F7FA' : colors.white,
                color: colors.black,
                fontWeight: '600',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {goalLabels[g]}
            </button>
          ))}

          {error && <p style={{ color: '#EF4444', fontSize: typography.sizes.sm, margin: 0 }}>{error}</p>}

          <button
            onClick={submit}
            disabled={loading}
            style={{ background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Создаём аккаунт...' : 'Зарегистрироваться'}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: spacing.lg, fontSize: typography.sizes.sm }}>
          Уже есть аккаунт? <Link href="/auth/login" style={{ color: colors.primary, fontWeight: 'bold' }}>Войти</Link>
        </p>
      </div>
    </div>
  );
}
