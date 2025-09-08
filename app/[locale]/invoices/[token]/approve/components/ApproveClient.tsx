"use client";
import Button from "@/app/components/Button";
import DisplayOldAndNewItems from "../components/DisplayOldAndNewItems";
import { approveChangesActions } from "../actions";
import { invoiceitem } from "@/lib/generated/prisma/wasm";

type invoiceitemview = {
  id: number;
  description: string;
  quantity: number;
  unitCents: number;
};

export default function ApproveClient({
  oldItems,
  newItems,
  invoice,
}: {
  oldItems: (invoiceitem | null)[];
  newItems: (invoiceitem | null)[];
  invoice: any;
}) {
  async function approveChanges() {
    if (invoice) {
      await approveChangesActions(newItems, oldItems, invoice.id);
    }
  }
  // turn all null objects to an empty object so that we can map over them
  const normalizedOldItems = oldItems.map((item) =>
    item ? item : ({} as invoiceitemview)
  );
  const normalizedNewItems = newItems.map((item) =>
    item ? item : ({} as invoiceitemview)
  );

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
        oldItems={normalizedOldItems}
        newItems={normalizedNewItems}
        allItems={invoice.invoiceitem}
      />
      {/* <h2>Total: {fmt.format(invoice.totalCents / 100)}</h2> */}
      <div className="flex flex-row items-center gap-4 mt-4">
        <Button className="mt-2" color="blue" onClick={approveChanges}>
          Confirm
        </Button>
        <Button className="mt-2" color="red">
          Reject
        </Button>
      </div>
    </main>
  );
}
