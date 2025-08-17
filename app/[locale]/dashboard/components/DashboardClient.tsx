"use client";
import { createInvoiceAction, deleteInvoiceAction } from "../actions";
import InvoiceItemsManager from "./InvoiceItemsManager";

interface Invoice {
  id: number;
  number: string;
  client: { name: string };
  totalCents: number;
  currency: string;
  token: string;
}

interface Client {
  id: number;
  name: string;
  email: string;
}

export default function DashboardClient({
  clients,
  invoices,
  baseUrl,
  locale,
}: any) {
  async function createInvoice(formData: FormData) {
    await createInvoiceAction({}, formData);
  }
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

        <section>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
            Create invoice
          </h2>
          <form
            action={createInvoice}
            // Using a grid for a responsive form layout
            className="mt-4 grid max-w-3xl grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
          >
            <div className="sm:col-span-6">
              <label
                htmlFor="clientId"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Client
              </label>
              <select
                id="clientId"
                name="clientId"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
              >
                {clients.map((c: Client) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Number
              </label>
              <input
                type="text"
                id="number"
                name="number"
                defaultValue={`INV-${Date.now()}`}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="currency"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Currency
              </label>
              <input
                type="text"
                id="currency"
                name="currency"
                defaultValue="USD"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="issueDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Issue Date
              </label>
              <input
                type="date"
                id="issueDate"
                name="issueDate"
                defaultValue={new Date().toISOString().slice(0, 10)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                defaultValue={new Date(Date.now() + 7 * 864e5)
                  .toISOString()
                  .slice(0, 10)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
              />
            </div>

            <div className="sm:col-span-6">
              <InvoiceItemsManager />
            </div>

            <div className="sm:col-span-6">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>
        </section>

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
