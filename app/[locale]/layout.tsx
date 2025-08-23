import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Link from "next/link";
import "../globals.css";

export const metadata = { title: "Invoicer" };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <nav className="flex items-center text-white justify-between p-4 shadow dark:bg-slate-800">
          <Link href={`/${locale}`}>Home</Link>
          <Link href={`/${locale}/dashboard`}>Dashboard</Link>
          <Link href={`/${locale}/auth/signin`}>Sign in</Link>
        </nav>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: 8 }}>
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
