'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { isLevelChosen } from '@/lib/levelSession';

export function AuthGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname.startsWith('/auth');
  const [ready, setReady] = useState(isAuthPage);

  useEffect(() => {
    if (isAuthPage) {
      setReady(true);
      return;
    }
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      if (!data.session) {
        router.replace('/auth/login');
      } else if (pathname !== '/choose-level' && !isLevelChosen()) {
        router.replace('/choose-level');
      } else {
        setReady(true);
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && !isAuthPage) router.replace('/auth/login');
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [pathname, isAuthPage, router]);

  if (!ready) return null;
  return <>{children}</>;
}
