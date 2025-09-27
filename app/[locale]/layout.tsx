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
      <body className="min-h-screen bg-root pb-20 text-white">
        <nav className="flex items-center justify-between p-4 shadow bg-background border-b border-border">
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
