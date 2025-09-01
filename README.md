# Aromika_Perfume — Telegram Mini App (Next.js)

## Быстрый старт на Vercel
1. Импортируйте репозиторий/папку в Vercel.
2. В **Project Settings → Environment Variables** добавьте:
   - `TELEGRAM_BOT_TOKEN` = 7998061365:AAHA974Bp6MzHJe3Xc0cO5TShnTgBzayQ7k
   - `TELEGRAM_OWNER_CHAT_ID` = 538375748
3. Деплой.
4. В BotFather укажите Web App URL = ваш домен Vercel.
5. Откройте мини‑приложение из бота (кнопка меню или команда).

## Как это работает
- UI: `/app/page.tsx`
- API: `/app/api/order/route.ts` — отправляет заказ владельцу и подтверждение клиенту.

## Логотипы
- `public/assets/logo.png` — премиум‑логотип.
- `public/assets/icon.png` — круглая иконка (буква A).
