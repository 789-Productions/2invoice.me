import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getClients, getRecentInvoices } from "@/lib/data";
import DashboardClient from "./components/DashboardClient";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.userId) {
    redirect(`/${locale}/auth/signin`);
  }
  const clients = await getClients();
  const invoices = await getRecentInvoices();
  return (
    <DashboardClient clients={clients} invoices={invoices} locale={locale} />
  );
}
