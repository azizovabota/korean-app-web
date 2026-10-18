'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { colors, typography, spacing } from '@/constants/colors';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setError('');
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/auth/reset`,
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSent(true);
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
          Восстановление пароля
        </h1>

        <div style={{ backgroundColor: colors.white, borderRadius: '16px', padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
          {sent ? (
            <p style={{ fontSize: typography.sizes.sm, color: colors.black, margin: 0, lineHeight: '1.6' }}>
              Если аккаунт с таким email существует, мы отправили письмо со ссылкой для смены пароля. Откройте письмо и перейдите по ссылке.
            </p>
          ) : (
            <>
              <p style={{ fontSize: typography.sizes.sm, color: colors.darkGray, margin: 0 }}>
                Введите email, на который зарегистрирован аккаунт. Пришлём ссылку для смены пароля.
              </p>
              <input style={inputStyle} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              {error && <p style={{ color: '#EF4444', fontSize: typography.sizes.sm, margin: 0 }}>{error}</p>}
              <button
                onClick={submit}
                disabled={loading || !email.trim()}
                style={{ background: colors.gradient, color: colors.white, border: 'none', borderRadius: '12px', padding: spacing.lg, fontWeight: '600', cursor: 'pointer', opacity: loading || !email.trim() ? 0.6 : 1 }}
              >
                {loading ? 'Отправляем...' : 'Отправить ссылку'}
              </button>
            </>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: spacing.lg, fontSize: typography.sizes.sm }}>
          <Link href="/auth/login" style={{ color: colors.primary, fontWeight: 'bold' }}>← Вернуться ко входу</Link>
        </p>
      </div>
    </div>
  );
}
