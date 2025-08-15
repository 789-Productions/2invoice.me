import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import EditInvoiceComponent from "./components/EditInvoicePage";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ token: string; locale: string }>;
}) {
  const { token, locale } = await params;
  const session = await auth();
  if (!session?.userId) {
    redirect(`/${locale}/auth/signin`);
  }
  const clients = await prisma.client.findMany({
    where: { userId: session.userId },
  });
  const invoice = await prisma.invoice.findUnique({
    where: { token: token },
    include: { client: true, items: true },
  });
  const items = invoice?.items || [];
  return (
    <EditInvoiceComponent clients={clients} invoice={invoice} items={items} />
  );
}
