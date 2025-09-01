export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { items, name, phone, userId } = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const ownerId = process.env.TELEGRAM_OWNER_CHAT_ID;
    if (!token || !ownerId) {
      return Response.json({ ok: false, error: 'Missing bot env' }, { status: 500 });
    }

    const orderText =
`📦 Новый заказ в Aromika_Perfume
Имя: ${name}
Телефон: ${phone}
${items && items.length ? items.map((i: any, idx: number) => `
${idx+1}) ${i.name} — ${i.size} — ${i.price} ₽`).join('') : '\n(корзина пуста)'} 
`;

    // Send to owner
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: ownerId, text: orderText }),
    });

    // Send confirmation to client if we have userId
    if (userId) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: userId, text: '✨Спасибо за заказ в Aromika_Perfume! Мы скоро свяжемся с Вами✨' }),
      });
    }

    return Response.json({ ok: true });
  } catch (e: any) {
    return Response.json({ ok: false, error: e?.message || 'Unknown error' }, { status: 500 });
  }
}
