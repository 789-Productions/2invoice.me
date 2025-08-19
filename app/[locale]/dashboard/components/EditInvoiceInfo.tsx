import { Invoice } from "@/lib/generated/prisma/wasm";

interface Client {
  id: number;
  name: string;
  email: string;
}

export default function EditInvoiceInfo({
  clients,
  invoice,
}: {
  clients: Array<Client>;
  invoice: Invoice | null;
}) {
  const defaultValues = {
    number: invoice?.number || `INV-${Date.now()}`,
    currency: invoice?.currency || "USD",
    issueDate:
      invoice?.issueDate.toISOString().slice(0, 10) ||
      new Date().toISOString().slice(0, 10),
    dueDate:
      invoice?.dueDate.toISOString().slice(0, 10) ||
      new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10),
  };
  return (
    <section className="mt-4 grid max-w-3xl grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
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
          defaultValue={defaultValues.number}
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
          defaultValue={defaultValues.currency}
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
          defaultValue={defaultValues.issueDate}
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
    </section>
  );
}
