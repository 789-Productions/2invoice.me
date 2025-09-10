import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Link from "next/link";
import "../globals.css";
import { auth } from "@/lib/auth";
import ProfileDropdown from "../components/general/ProfileDropdown";

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
  const session = await auth();
  return (
    <html lang={locale}>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <nav className="flex items-center text-white justify-between p-4 shadow dark:bg-slate-800">
          <Link href={`/${locale}`}>Home</Link>
          <Link href={`/${locale}/dashboard`}>Dashboard</Link>
          <ProfileDropdown session={session} locale={locale} />
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
