export const runtime = "nodejs";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ApproveClient from "../../../../components/features/invoices/approve/ApproveClient";

export default async function InvoiceApprovePage({
  params,
}: {
  params: Promise<{ token: string; locale: string }>;
}) {
  const { token } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { token: token },
    include: { client: true, invoiceitem: true },
  });
  // invoice has to be in "NEEDS_APPROVAL" status
  if (!invoice) return notFound();
  if (invoice.status !== "NEEDS_APPROVAL") return notFound();

  // if in needs approval status, it has a history record with proposed changes
  const historyRecord = await prisma.invoicehistory.findFirst({
    where: { invoiceId: invoice.id, action: "CHANGED_BY_CLIENT" },
  });

  if (!historyRecord) {
    return notFound();
  }
  const invoiceChanges = await prisma.invoicechanges.findMany({
    where: { invoiceHistoryId: historyRecord.id },
  });

  // get all the new and old items referenced in the changes in one call
  const allValidItemIds = [
    ...new Set(
      invoiceChanges
        .flatMap((change) => [change.oldItemId, change.newItemId])
        .filter((id) => id !== 0)
    ),
  ];
  // one call to get all the items
  const getItems = await prisma.invoiceitem.findMany({
    where: { id: { in: allValidItemIds } },
  });
  // map them by id for easy lookup
  const itemById = new Map(getItems.map((item) => [item.id, item]));
  // build the newItems and oldItems arrays in the correct order, using null for missing items
  const newItems = invoiceChanges.map((change) =>
    change.newItemId === 0 ? null : itemById.get(change.newItemId) || null
  );
  const oldItems = invoiceChanges.map((change) =>
    change.oldItemId === 0 ? null : itemById.get(change.oldItemId) || null
  );

  return (
    <ApproveClient oldItems={oldItems} newItems={newItems} invoice={invoice} />
  );
}
