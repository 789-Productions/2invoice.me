import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
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
  const clients = await prisma.client.findMany({
    where: { userId: session.userId },
  });
  const invoices = await prisma.invoice.findMany({
    where: { userId: session.userId },
    include: { client: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  return (
    <DashboardClient
      clients={clients}
      invoices={invoices}
      baseUrl={baseUrl}
      locale={locale}
    />
  );
}
