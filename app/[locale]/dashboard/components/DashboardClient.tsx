"use client";
import { deleteInvoiceAction } from "../actions";
import CreateInvoice from "./CreateInvoice";
interface Invoice {
  id: number;
  number: string;
  client: { name: string };
  totalCents: number;
  currency: string;
  token: string;
}

export default function DashboardClient({
  clients,
  invoices,
  baseUrl,
  locale,
}: any) {
  async function deleteInvoice(formData: FormData) {
    await deleteInvoiceAction({}, formData);
  }

  return (
    // Main container with padding, background color, and vertical spacing between sections
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl space-y-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Dashboard
        </h1>

        <CreateInvoice clients={clients} />

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            Recent invoices
          </h2>
          <ul className="mt-4 space-y-4">
            {invoices.map((inv: Invoice) => (
              <li
                key={inv.id}
                className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm dark:bg-slate-800"
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-50">
                    #{inv.number} — {inv.client.name}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {(inv.totalCents / 100).toFixed(2)} {inv.currency}
                  </p>
                </div>
                {/* Action links/buttons on the right */}
                <div className="flex items-center gap-4 text-sm font-medium">
                  <a
                    href={`${baseUrl}/${locale}/invoices/${inv.token}`}
                    target="_blank"
                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    Html
                  </a>
                  <a
                    href={`/${locale}/invoices/${inv.token}/edit`}
                    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Edit
                  </a>
                  <form action={deleteInvoice} className="inline">
                    <input type="hidden" name="id" value={inv.id} />
                    <button
                      type="submit"
                      className="font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
