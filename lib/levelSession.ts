const LEVEL_CHOSEN_KEY = 'levelChosen';

// Уровень выбирается при каждом входе: флаг живёт в sessionStorage текущей вкладки.
// Если хранилище недоступно, считаем уровень выбранным, чтобы не зациклить переходы.
export function isLevelChosen(): boolean {
  try {
    return sessionStorage.getItem(LEVEL_CHOSEN_KEY) === '1';
  } catch {
    return true;
  }
}

export function markLevelChosen() {
  try {
    sessionStorage.setItem(LEVEL_CHOSEN_KEY, '1');
  } catch {
    // хранилище недоступно — ничего не делаем
  }
}
