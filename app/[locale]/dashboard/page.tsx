import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { createInvoiceAction, deleteInvoiceAction } from "./actions";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.userId) {
    redirect(`/${locale}/auth/signin`);
  }
  const clients = await prisma.client.findMany({
    where: { userId: session.userId },
  });
  const invoices = await prisma.invoice.findMany({
    where: { userId: session.userId },
    include: { client: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  async function createInvoice(formData: FormData) {
    "use server";
    await createInvoiceAction({}, formData);
  }
  async function deleteInvoice(formData: FormData) {
    "use server";
    await deleteInvoiceAction({}, formData);
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <section style={{ marginTop: 16 }}>
        <h2>Create invoice</h2>
        <form
          action={createInvoice}
          style={{ display: "grid", gap: 8, maxWidth: 600 }}
        >
          <label>
            Client
            <select name="clientId">
              {clients.map((c: { id: number; name: string; email: string }) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.email})
                </option>
              ))}
            </select>
          </label>
          <label>
            Number <input name="number" defaultValue={`INV-${Date.now()}`} />
          </label>
          <label>
            Currency <input name="currency" defaultValue="USD" />
          </label>
          <label>
            Issue Date{" "}
            <input
              type="date"
              name="issueDate"
              defaultValue={new Date().toISOString().slice(0, 10)}
            />
          </label>
          <label>
            Due Date{" "}
            <input
              type="date"
              name="dueDate"
              defaultValue={new Date(Date.now() + 7 * 864e5)
                .toISOString()
                .slice(0, 10)}
            />
          </label>
          <label>
            Items JSON{" "}
            <textarea
              name="items"
              rows={4}
              defaultValue='[{"description":"Service","quantity":1,"unitCents":5000}]'
            />
          </label>
          <button type="submit">Create</button>
        </form>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Recent invoices</h2>
        <ul>
          {invoices.map(
            (inv: {
              id: number;
              number: string;
              client: { name: string };
              totalCents: number;
              currency: string;
              token: string;
            }) => (
              <li key={inv.id}>
                #{inv.number} — {inv.client.name} —{" "}
                {(inv.totalCents / 100).toFixed(2)} {inv.currency}
                {" | "}
                <a
                  href={`${baseUrl}/${locale}/invoices/${inv.token}`}
                  target="_blank"
                >
                  Html
                </a>
                {" | "}
                {/* <a href={`/api/invoices/${inv.id}/pdf`} target="_blank">
                  PDF
                </a>
                {" | "}
                <form
                  action={`/api/invoices/${inv.id}/email`}
                  method="post"
                  style={{ display: "inline" }}
                >
                  <button type="submit">Email</button>
                </form> */}
                <form action={deleteInvoice} style={{ display: "inline" }}>
                  <input type="hidden" name="id" value={inv.id} />
                  <button type="submit">Delete</button>
                </form>
              </li>
            )
          )}
        </ul>
      </section>
    </main>
  );
}
