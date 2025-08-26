import { Header } from "@/app/components/Headers";
import InvoiceHtmlItem from "../../components/InvoiceHtmlItem";

interface Invoice {
  id: number;
  number: string;
  client: { name: string };
  totalCents: number;
  currency: string;
  token: string;
}

export default function RecentInvoices({ invoices, locale }: any) {
  return (
    <section>
      <Header>Recent invoices</Header>
      {/* line */}
      <br />
      <ul className="mt-4 space-y-4">
        {invoices.map((inv: Invoice) => (
          <InvoiceHtmlItem key={inv.id} inv={inv} locale={locale} />
        ))}
      </ul>
    </section>
  );
}
