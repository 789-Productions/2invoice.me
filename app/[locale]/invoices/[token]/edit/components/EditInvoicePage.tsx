"use client";
import { editInvoiceAction } from "../actions";
import InvoiceItemsManager from "../../../../dashboard/components/InvoiceItemsManager";
import EditInvoiceInfo from "../../../../dashboard/components/EditInvoiceInfo";
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
      <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
        Edit Invoice
      </h1>
      <section className="mt-8 justify-center">
        <form
          action={dispatch}
          style={{ display: "grid", gap: 8, maxWidth: 600 }}
        >
          <EditInvoiceInfo clients={clients} invoice={invoice} />
          <div className="">
            <InvoiceItemsManager initialItems={items || []} />
          </div>
          <input type="hidden" name="id" value={invoice?.id} />
          <button
            type="submit"
            className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={isPending}
          >
            {isPending ? "Editing..." : "Edit"}
          </button>{" "}
        </form>

        {state?.ok && (
          <p className="inline-flex justify-center text-green-600">
            {state.message}
          </p>
        )}
      </section>
    </main>
  );
}
