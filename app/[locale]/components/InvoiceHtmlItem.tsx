import { deleteInvoiceAction } from "@/app/[locale]/dashboard/actions";
export default function InvoiceHtmlItem({
  inv,
  locale,
}: {
  inv: any;
  locale: string;
}) {
  const deleteInvoice = async (formData: FormData) => {
    await deleteInvoiceAction({}, formData);
  };
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  return (
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
  );
}
