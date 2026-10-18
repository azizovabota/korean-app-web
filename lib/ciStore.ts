import type { CiItem } from '@/components/CiExercise';

const STORAGE_KEY = 'ci-beginner-decisions';
const SESSION_SIZE = 15;

export type CiDecision = 'remove' | 'keep';

interface CiDecisions {
  removed: string[];
  repeat: string[];
}

function read(): CiDecisions {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { removed: [], repeat: [] };
    const parsed = JSON.parse(raw) as CiDecisions;
    return { removed: parsed.removed ?? [], repeat: parsed.repeat ?? [] };
  } catch {
    return { removed: [], repeat: [] };
  }
}

function write(value: CiDecisions) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // localStorage недоступен: решения действуют только в текущей сессии
  }
}

export function saveDecision(id: string, decision: CiDecision) {
  const current = read();
  const removed = current.removed.filter((x) => x !== id);
  const repeat = current.repeat.filter((x) => x !== id);
  if (decision === 'remove') removed.push(id);
  else repeat.push(id);
  write({ removed, repeat });
}

export function resetDecisions() {
  write({ removed: [], repeat: [] });
}

function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function buildSession(all: CiItem[]): CiItem[] {
  const { removed, repeat } = read();
  const pool = all.filter((item) => !removed.includes(item.id));
  const repeatItems = shuffle(pool.filter((item) => repeat.includes(item.id)));
  const rest = shuffle(pool.filter((item) => !repeat.includes(item.id)));
  return [...repeatItems, ...rest].slice(0, SESSION_SIZE);
}
