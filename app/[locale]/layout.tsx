import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Link from "next/link";

export const metadata = { title: "Invoicer" };

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <nav
          style={{
            display: "flex",
            gap: 12,
            padding: 12,
            borderBottom: "1px solid #eee",
          }}
        >
          <Link href={`/${locale}`}>Home</Link>
          <Link href={`/${locale}/dashboard`}>Dashboard</Link>
          <Link href={`/${locale}/auth/signin`}>Sign in</Link>
        </nav>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: 16 }}>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
