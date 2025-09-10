"use client";
export const runtime = "nodejs";
import Button from "@/app/components/Button";
import ControlledInvoiceItemsManager from "@/app/[locale]/dashboard/components/ControlledInvoiceItemsManager";
import { useState } from "react";
import { invoiceitem } from "@/lib/generated/prisma/wasm";
import { sendConfirmChangesAction } from "../actions";

type Item = {
  description: string;
  quantity: number;
  unitCents: number;
};

export default function InvoiceProposeChangesClientPage({
  invoice,
}: {
  invoice: any;
}) {
  const checkEqualInvoiceItems = (a: invoiceitem, b: Item) => {
    if (
      a.description !== b.description ||
      a.quantity !== b.quantity ||
      a.unitCents !== b.unitCents
    ) {
      return false;
    }
    return true;
  };

  const getDifferences = (oldItems: invoiceitem[], newItems: Item[]) => {
    const maxItems = Math.max(oldItems.length, newItems.length);
    const differences = [];
    for (let i = 0; i < maxItems; i++) {
      let newItem = null;
      let oldItem = null;
      if (i < newItems.length) {
        newItem = newItems[i];
      }
      if (i < oldItems.length) {
        oldItem = oldItems[i];
      }
      // modification
      if (newItem && oldItem && !checkEqualInvoiceItems(oldItem, newItem)) {
        differences.push({ oldItem, newItem: { ...newItem } });
      }
      // addition
      if (newItem && !oldItem) {
        differences.push({ oldItem: null, newItem: { ...newItem } });
      }
      // deletion
      if (!newItem && oldItem) {
        differences.push({ oldItem, newItem: null });
      }
    }
    return differences;
  };

  const onConfirmChanges = async () => {
    const differences = getDifferences(oldItems, items);
    console.log("Differences to submit:", differences);
    await sendConfirmChangesAction(differences, invoice.id);
  };

  const oldItems = invoice.invoiceitem || [];
  const [items, setItems] = useState<Item[]>(oldItems);
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
      <ControlledInvoiceItemsManager items={items} onItemChange={setItems} />
      {/*      <h2>Total: {fmt.format(invoice.totalCents / 100)}</h2>
       */}
      <div className="flex flex-row items-center gap-4 mt-4">
        <Button className="mt-2" color="blue" onClick={onConfirmChanges}>
          Confirm Changes
        </Button>
        <Button className="mt-2" color="red">
          Cancel
        </Button>
      </div>
    </main>
  );
}
