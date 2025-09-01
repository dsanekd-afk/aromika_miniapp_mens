'use client';
import Script from 'next/script';
import Image from 'next/image';
import './globals.css';

type Item = { name: string; size: string; price: number };

const PRODUCTS = [
  {
    name: 'Giorgio Armani / CODE',
    subtitle: 'Мужской аромат · Восточные фужерные',
    img: '/assets/logo.png',
    sizes: [
      { label: '10 мл', price: 600 },
      { label: '20 мл', price: 1100 },
      { label: '30 мл', price: 1500 },
      { label: '50 мл', price: 2400 },
      { label: 'Ароматизатор 6 мл', price: 450 },
      { label: 'Диффузор 50 мл', price: 1900 },
    ],
  },
  {
    name: 'Creed / Aventus',
    subtitle: 'Мужской аромат · Шипровые фруктовые',
    img: '/assets/logo.png',
    sizes: [
      { label: '10 мл', price: 600 },
      { label: '20 мл', price: 1100 },
      { label: '30 мл', price: 1500 },
      { label: '50 мл', price: 2400 },
      { label: 'Ароматизатор 6 мл', price: 450 },
      { label: 'Диффузор 50 мл', price: 1900 },
    ],
  },
];

declare global {
  interface Window { Telegram: any; }
}

export default function Page() {
  const cart: Item[] = [];
  let selected: Record<string, { size: string; price: number }> = {};

  const addToCart = (p: any) => {
    const sel = selected[p.name];
    if (!sel) return alert('Выберите объём');
    cart.push({ name: p.name, size: sel.size, price: sel.price });
    const tg = (window as any).Telegram?.WebApp;
    if (tg) {
      tg.MainButton.setText(`Оформить заказ (${cart.length})`);
      tg.MainButton.show();
      tg.MainButton.onClick(() => openCheckout());
    } else {
      const footer = document.getElementById('footer');
      if (footer) footer.style.display = 'flex';
      const cartCount = document.getElementById('cartCount');
      if (cartCount) cartCount.textContent = String(cart.length);
    }
  };

  const openCheckout = () => {
    (document.getElementById('checkoutForm') as HTMLDivElement)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitOrder = async (e: any) => {
    e.preventDefault();
    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
    if (!name || !phone) return alert('Заполните имя и телефон');

    const tg = (window as any).Telegram?.WebApp;
    const userId = tg?.initDataUnsafe?.user?.id || null;
    const initData = tg?.initData || null;

    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, name, phone, userId, initData }),
    });
    const data = await res.json();
    if (data.ok) {
      const s = document.getElementById('success');
      if (s) s.style.display = 'block';
      if (tg) {
        tg.showAlert('Заказ отправлен');
        tg.close();
      }
    } else {
      alert('Ошибка отправки заказа. Попробуйте ещё раз.');
    }
  };

  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
      <header>
        <Image src="/assets/logo.png" alt="Aromika_Perfume" width={120} height={32} />
        <div className="header-title">Aromika_Perfume</div>
      </header>

      <div className="container">
        <div className="grid">
          {PRODUCTS.map((p) => (
            <div key={p.name} className="card">
              <img src={p.img} alt={p.name} />
              <div>
                <div className="title">{p.name}</div>
                <div className="subtitle">{p.subtitle}</div>
              </div>
              <div className="sizes">
                {p.sizes.map((s) => (
                  <button
                    key={s.label}
                    className={"size"}
                    onClick={(e) => {
                      (document.querySelectorAll('.size') as NodeListOf<HTMLButtonElement>).forEach(b => b.classList.remove('active'));
                      (e.target as HTMLButtonElement).classList.add('active');
                      selected[p.name] = { size: s.label, price: s.price };
                    }}
                  >
                    {s.label} — {s.price} ₽
                  </button>
                ))}
              </div>
              <button className="add" onClick={() => addToCart(p)}>Добавить в заказ</button>
            </div>
          ))}
        </div>

        <form id="checkoutForm" className="form" onSubmit={submitOrder}>
          <div className="title">Оформление заказа</div>
          <input id="name" className="input" placeholder="Ваше имя" />
          <input id="phone" className="input" placeholder="+7 9XX XXX-XX-XX" />
          <button className="add" type="submit">Отправить заказ</button>
          <div id="success" className="success">Заявка отправлена</div>
        </form>
      </div>

      <div id="footer" className="footer" style={{display:'none'}}>
        <div>Товары в заказе: <span id="cartCount">0</span></div>
        <button className="checkout" onClick={openCheckout}>Оформить</button>
      </div>
    </>
  );
}
