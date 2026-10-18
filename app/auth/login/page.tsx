'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { colors, typography, spacing } from '@/constants/colors';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (signInError) {
      setError(signInError.message === 'Invalid login credentials' ? 'Неверный email или пароль' : signInError.message);
      setLoading(false);
      return;
    }
    router.replace('/');
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
          Вход
        </h1>

        <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={inputStyle} type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <p style={{ color: '#EF4444', fontSize: typography.sizes.sm, margin: 0 }}>{error}</p>}

          <Link href="/auth/forgot" style={{ textAlign: 'center', color: colors.primary, fontSize: typography.sizes.sm, fontWeight: 'bold' }}>
            Забыли пароль?
          </Link>

          <button
            onClick={submit}
            disabled={loading || !email || !password}
            style={{ background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: spacing.lg, fontSize: typography.sizes.sm }}>
          Нет аккаунта? <Link href="/auth/register" style={{ color: colors.primary, fontWeight: 'bold' }}>Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}
