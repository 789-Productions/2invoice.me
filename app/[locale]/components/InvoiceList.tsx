import { Invoice } from "@/lib/generated/prisma/wasm";
import InvoiceHtmlItem from "./InvoiceHtmlItem";

export default function InvoiceList({
  invoices,
  locale,
}: {
  invoices: Invoice[];
  locale: string;
}) {
  return (
    <div>
      <ul>
        {invoices.map((invoice) => (
          <div className="mb-2 space-y-2" key={invoice.id}>
            <InvoiceHtmlItem inv={invoice} locale={locale} />
          </div>
        ))}
      </ul>
    </div>
  );
}
