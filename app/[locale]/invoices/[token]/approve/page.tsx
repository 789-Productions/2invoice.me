export const runtime = "nodejs";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Button from "@/app/components/Button";
import DisplayOldAndNewItems from "./components/DisplayOldAndNewItems";

export default async function InvoiceApprovePage({
  params,
}: {
  params: Promise<{ token: string; locale: string }>;
}) {
  const { token, locale } = await params;
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

  console.log("historyRecord", historyRecord);

  const invoiceChanges = await prisma.invoicechanges.findMany({
    where: { invoiceHistoryId: historyRecord?.id },
  });
  console.log("invoiceChanges", invoiceChanges);

  const newItems = await prisma.invoiceitem.findMany({
    where: {
      id: {
        in: invoiceChanges
          .map((change) => change.newItemId)
          .filter((id) => id !== 0),
      },
    },
  });
  const oldItems = await prisma.invoiceitem.findMany({
    where: {
      id: {
        in: invoiceChanges
          .map((change) => change.oldItemId)
          .filter((id) => id !== 0),
      },
    },
  });
  console.log("newItems", newItems);
  console.log("oldItems", oldItems);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-8 dark:bg-slate-900 text-white">
      <h1 className="text-2xl font-bold text-center mb-4 text-yellow-500">
        Invoice #{invoice.number}
      </h1>
      <p>
        <strong>Bill To:</strong> {invoice.client.name} ({invoice.client.email})
      </p>
      <p className="text-sm text-gray-400">
        Issued: {invoice.issueDate.toDateString()} | Due:{" "}
        {invoice.dueDate.toDateString()}
      </p>
      <DisplayOldAndNewItems
        oldItems={oldItems}
        newItems={newItems}
        allItems={invoice.invoiceitem}
      />
      {/* <h2>Total: {fmt.format(invoice.totalCents / 100)}</h2> */}
      <div className="flex flex-row items-center gap-4 mt-4">
        <Button className="mt-2" color="blue">
          Confirm
        </Button>
        <Button className="mt-2" color="red">
          Reject
        </Button>
      </div>
    </main>
  );
}
