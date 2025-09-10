"use client";
import { useState } from "react";
import { Header } from "@/app/components/ui/Headers";
import Label from "@/app/components/ui/Label";
import InvoiceHtmlItem from "../../general/InvoiceHtmlItem";
import { invoice } from "@/lib/generated/prisma/wasm";

export default function RecentInvoices({ invoices, locale }: any) {
  const [showCancelled, setShowCancelled] = useState(false);
  if (!invoices || invoices.length === 0) {
    return <div>No invoices found</div>;
  }
  return (
    <section>
      <Header>Recent invoices</Header>
      <div className="mt-2 flex items-center gap-2">
        {/* checkbox to show cancelled invoices */}
        <Label htmlFor="show-cancelled">Show Cancelled Invoices</Label>
        <input
          type="checkbox"
          id="show-cancelled"
          checked={showCancelled}
          onChange={(e) => setShowCancelled(e.target.checked)}
        />
      </div>
      {/* line */}
      <br />
      <ul className="mt-4 space-y-4">
        {invoices.map((inv: invoice) =>
          inv.status === "CANCELLED" && !showCancelled ? null : (
            <InvoiceHtmlItem key={inv.id} inv={inv} locale={locale} />
          )
        )}
      </ul>
    </section>
  );
}
