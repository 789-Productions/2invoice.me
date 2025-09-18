import { invoice } from "@/lib/generated/prisma/wasm";
import InvoiceHtmlItem from "./InvoiceHtmlItem";

export default function InvoiceList({
  invoices,
  locale,
}: {
  invoices: invoice[];
  locale: string;
}) {
  return (
    <div>
      <ul>
        {invoices.map((invoice) => (
          <div className="mb-2 space-y-2" key={invoice.id}>
            <InvoiceHtmlItem inv={invoice} />
          </div>
        ))}
      </ul>
    </div>
  );
}
