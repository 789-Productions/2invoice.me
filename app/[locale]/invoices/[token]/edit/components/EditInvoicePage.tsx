"use client";
import { editInvoiceAction } from "../actions";
import InvoiceItemsManager from "../../../../dashboard/components/InvoiceItemsManager";
import { useActionState } from "react";
import { Invoice, Client, InvoiceItem } from "@/lib/generated/prisma/wasm";

export default function EditInvoiceComponent({
  clients,
  invoice,
  items,
}: {
  clients: Array<Client>;
  invoice: Invoice | null;
  items: Array<InvoiceItem>;
}) {
  const [state, dispatch, isPending] = useActionState(editInvoiceAction, {
    ok: false,
    message: "",
  });

  return (
    <main>
      <h1>Edit Invoice</h1>
      <section style={{ marginTop: 16 }}>
        <form
          action={dispatch}
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
          <InvoiceItemsManager initialItems={items || []} />
          <input type="hidden" name="id" value={invoice?.id} />
          <button type="submit" disabled={isPending}>
            {isPending ? "Editing..." : "Edit"}
          </button>{" "}
        </form>

        {state?.ok && <p>{state.message}</p>}
      </section>
    </main>
  );
}
