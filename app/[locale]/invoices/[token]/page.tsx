export const runtime = "nodejs";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function InvoicePublicPage({
  params,
}: {
  params: { token: string; locale: string };
}) {
  const invoice = await prisma.invoice.findUnique({
    where: { token: params.token },
    include: { client: true, items: true },
  });
  if (!invoice) return notFound();

  const fmt = new Intl.NumberFormat(
    params.locale === "es" ? "es-ES" : "en-US",
    {
      style: "currency",
      currency: invoice.currency,
    }
  );

  return (
    <main>
      <h1>Invoice #{invoice.number}</h1>
      <p>
        <strong>Bill To:</strong> {invoice.client.name} ({invoice.client.email})
      </p>
      <p>
        Issue: {invoice.issueDate.toDateString()} | Due:{" "}
        {invoice.dueDate.toDateString()}
      </p>
      <ul>
        {invoice.items.map((it) => (
          <li key={it.id}>
            {it.description} × {it.quantity} —{" "}
            {fmt.format((it.unitCents * it.quantity) / 100)}
          </li>
        ))}
      </ul>
      <h2>Total: {fmt.format(invoice.totalCents / 100)}</h2>
    </main>
  );
}
