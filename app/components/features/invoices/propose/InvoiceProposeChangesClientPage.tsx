"use client";
export const runtime = "nodejs";
import Button from "@/app/components/ui/Button";
import ControlledInvoiceItemsManager from "@/app/components/features/dashboard/ControlledInvoiceItemsManager";
import { useState, useEffect } from "react";
import { invoiceitem } from "@/lib/generated/prisma/wasm";
import { sendConfirmChangesAction } from "../../../../[locale]/invoices/[token]/propose_changes/actions";
import { SmallHeader } from "@/app/components/ui/Headers";

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

  // function that compares two arrays of invoice items and returns the differences

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
  const [totalPrice, setTotalPrice] = useState(invoice.totalCents || 0);

  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const newTotal = items.reduce(
      (acc, item) => acc + item.quantity * item.unitCents,
      0
    );
    setTotalPrice(newTotal);
  }, [items]);
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
      <SmallHeader>Adjusted Total: {fmt.format(totalPrice / 100)}</SmallHeader>
      <div className="flex flex-row items-center gap-4 mt-4">
        <Button className="mt-2" color="blue" onClick={onConfirmChanges}>
          Confirm Changes
        </Button>
        <Button
          className="mt-2"
          color="red"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
      </div>
    </main>
  );
}
