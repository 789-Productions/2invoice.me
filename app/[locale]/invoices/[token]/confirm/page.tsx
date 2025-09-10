export const runtime = "nodejs";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Button from "@/app/components/Button";
import { confirmInvoiceAction, cancelInvoiceAction } from "./actions";

export default async function InvoiceConfirmPage({
  params,
}: {
  params: Promise<{ token: string; locale: string }>;
}) {
  const { token, locale } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { token: token },
    include: { client: true, invoiceitem: true },
  });
  if (!invoice) return notFound();

  const fmt = new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency: invoice.currency,
  });
  const approveInvoice = async () => {
    await confirmInvoiceAction(invoice.id);
  };
  const cancelInvoice = async () => {
    await cancelInvoiceAction(invoice.id);
  };

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
      <ul className="list-disc pl-5 mt-4">
        {invoice.invoiceitem.map(
          (it: {
            id: number;
            description: string;
            quantity: number;
            unitCents: number;
          }) => (
            <li className="py-1" key={it.id}>
              {it.description} ({fmt.format(it.unitCents / 100)}) ×{" "}
              {it.quantity} — {fmt.format((it.unitCents * it.quantity) / 100)}
            </li>
          )
        )}
      </ul>
      <h2>Total: {fmt.format(invoice.totalCents / 100)}</h2>
      <div className="flex flex-row items-center gap-4 mt-4">
        <Button className="mt-2" color="blue" onClick={approveInvoice}>
          Confirm Invoice
        </Button>
        <Button className="mt-2" color="red" onClick={cancelInvoice}>
          Cancel Invoice
        </Button>
      </div>
      <div>
        <Button
          className="mt-2"
          color="yellow"
          onClick={() =>
            (window.location.href = `/${locale}/invoices/${token}/propose_changes`)
          }
        >
          Propose Changes
        </Button>
      </div>
    </main>
  );
}
