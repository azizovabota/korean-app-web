create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null default '',
  goal text check (goal in ('topik_1_2', 'topik_3_4', 'topik_5_6')),
  created_at timestamptz not null default now()
);

create table if not exists public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_key text not null,
  score integer not null default 0,
  total integer not null default 0,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_key)
);

create table if not exists public.mistakes (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_key text not null,
  source text not null,
  prompt text not null,
  user_answer text not null,
  correct_answer text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, question_key)
);

alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.mistakes enable row level security;

create policy "own profile" on public.profiles for all
  using (auth.uid() = id) with check (auth.uid() = id);
create policy "own progress" on public.lesson_progress for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own mistakes" on public.mistakes for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
