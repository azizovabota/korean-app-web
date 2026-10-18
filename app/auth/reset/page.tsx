'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { colors, typography, spacing } from '@/constants/colors';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setReady(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const submit = async () => {
    setError('');
    if (password.length < 6) {
      setError('Пароль должен быть не короче 6 символов');
      return;
    }
    if (password !== repeat) {
      setError('Пароли не совпадают');
      return;
    }
    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateError) {
      setError(updateError.message);
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
          Новый пароль
        </h1>

        <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          {!ready ? (
            <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0, lineHeight: '1.6' }}>
              Ссылка недействительна или устарела. Запросите новую на странице восстановления пароля.
            </p>
          ) : (
            <>
              <input style={inputStyle} type="password" placeholder="Новый пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input style={inputStyle} type="password" placeholder="Повторите пароль" value={repeat} onChange={(e) => setRepeat(e.target.value)} />
              {error && <p style={{ color: '#EF4444', fontSize: typography.sizes.sm, margin: 0 }}>{error}</p>}
              <button
                onClick={submit}
                disabled={loading || !password || !repeat}
                style={{ background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontWeight: '600', cursor: 'pointer', opacity: loading ? 0.6 : 1 }}
              >
                {loading ? 'Сохраняем...' : 'Сохранить новый пароль'}
              </button>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: spacing.lg, fontSize: typography.sizes.sm }}>
          <Link href="/auth/forgot" style={{ color: colors.primary, fontWeight: 'bold' }}>Запросить новую ссылку</Link>
        </p>
      </div>
    </div>
  );
}
