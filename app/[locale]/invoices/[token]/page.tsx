export const runtime = "nodejs";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function InvoicePublicPage({
  params,
}: {
  params: Promise<{ token: string; locale: string }>;
}) {
  const { token, locale } = await params;
  const invoice = await prisma.invoice.findUnique({
    where: { token: token },
    include: { client: true, items: true },
  });
  if (!invoice) return notFound();

  const fmt = new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US", {
    style: "currency",
    currency: invoice.currency,
  });

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
        {invoice.items.map(
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
    </main>
  );
}
