export const ciLevels: Record<string, { title: string; hasData: boolean }> = {
  beginner: { title: 'Начальный', hasData: true },
  intermediate: { title: 'Средний', hasData: false },
  advanced: { title: 'Продвинутый', hasData: false },
};

export const ciMethods: Record<string, { title: string; description: string }> = {
  listen: { title: '1) Слушай и пиши', description: 'AI озвучит предложение целиком. Запишите слово, которое услышали.' },
  read: { title: '2) Читай и дописывай', description: 'Прочитайте предложение и впишите пропущенное слово.' },
  dictation: { title: '3) Только озвучка', description: 'Прослушайте предложение и впишите его целиком.' },
};
