import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import InvoiceProposeChangesClientPage from "./components/InvoiceProposeChangesClientPage";

export default async function InvoiceProposeChangesPage({
  params,
}: {
  params: Promise<{ token: string; locale: string }>;
}) {
  const { token } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { token: token },
    include: { client: true, invoiceitem: true },
  });

  if (!invoice) return notFound();

  return <InvoiceProposeChangesClientPage invoice={invoice} />;
}
