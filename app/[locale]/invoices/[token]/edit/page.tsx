import { editInvoiceAction } from "./actions";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ token: string; locale: string }>;
}) {
  const handleEditInvoice = async (formData: FormData) => {
    "use server";
    await editInvoiceAction({}, formData);
  };

  const { token, locale } = await params;
  const session = await auth();
  if (!session?.userId) {
    redirect(`/${locale}/auth/signin`);
  }

  const clients = await prisma.client.findMany({
    where: { userId: session.userId },
  });
  const invoice = await prisma.invoice.findUnique({
    where: { token: token },
    include: { client: true, items: true },
  });

  const items = invoice?.items.map((it) => ({
    description: it.description,
    quantity: it.quantity,
    unitCents: it.unitCents,
  }));

  return (
    <main>
      <h1>Edit Invoice</h1>
      <section style={{ marginTop: 16 }}>
        <h2>Edit invoice</h2>
        <form
          action={handleEditInvoice}
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
            Number <input name="number" defaultValue={invoice?.number} />
          </label>
          <label>
            Currency <input name="currency" defaultValue={invoice?.currency} />
          </label>
          <label>
            Issue Date{" "}
            <input
              type="date"
              name="issueDate"
              defaultValue={invoice?.issueDate.toISOString().slice(0, 10)}
            />
          </label>
          <label>
            Due Date{" "}
            <input
              type="date"
              name="dueDate"
              defaultValue={invoice?.dueDate.toISOString().slice(0, 10)}
            />
          </label>
          <label>
            Items JSON{" "}
            <textarea
              rows={4}
              defaultValue={JSON.stringify(items, null, 2)}
              name="items"
            />
          </label>
          <input type="hidden" name="id" value={invoice?.id} />
          <button type="submit">Edit</button>
        </form>
      </section>
    </main>
  );
}
