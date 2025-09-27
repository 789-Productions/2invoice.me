"use client";
import { useState } from "react";
import ControlledInvoiceItemsManager from "./ControlledInvoiceItemsManager";

interface Item {
  description: string;
  quantity: number;
  unitCents: number;
}

interface InvoiceItemsManagerProps {
  initialItems?: Item[];
}

export default function InvoiceItemsManager({
  initialItems,
}: InvoiceItemsManagerProps) {
  const [items, setItems] = useState<Array<Item>>(
    initialItems || [
      { description: "Initial Item", quantity: 1, unitCents: 1000 },
    ]
  );
  return (
    <ControlledInvoiceItemsManager items={items} onItemChange={setItems} />
  );
}
