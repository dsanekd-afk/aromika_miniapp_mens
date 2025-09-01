export const metadata = {
  title: 'Aromika_Perfume — Mini App',
  description: 'Каталог ароматов Aromika_Perfume',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
