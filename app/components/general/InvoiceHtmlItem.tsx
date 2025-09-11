import {
  confirmInvoiceAction,
  deleteInvoiceAction,
} from "@/app/[locale]/dashboard/actions";
import { cancelInvoiceAction } from "@/app/[locale]/invoices/[token]/confirm/actions";
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
  const completeInvoice = async (formData: FormData) => {
    await confirmInvoiceAction({}, formData);
  };
  const cancelInvoice = async () => {
    await cancelInvoiceAction(inv.id);
  };
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const today = new Date().valueOf();
  // to determine if the invoice is overdue
  const differenceInDays = Math.ceil(
    (today - inv.dueDate.valueOf()) / (1000 * 60 * 60 * 24)
  );
  const addCommasToNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <li
      key={inv.id}
      className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm dark:bg-slate-800"
    >
      <div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-50">
            #{inv.number} — {inv.client.name}{" "}
          </p>
        </div>
        <div className="flex gap-1">
          <p className="text-sm text-green-600 dark:text-green-600">
            ${addCommasToNumber(inv.totalCents / 100)}
            {"."}
            {(inv.totalCents / 100).toFixed(2).slice(-2)} {inv.currency}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {" | "}
            {"Due: " + inv.dueDate.toDateString()}
          </p>
          {differenceInDays > 0 && (
            <p className="text-sm text-red-500"> ( Outstanding )</p>
          )}
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {" | "}
            {"Status: " + inv.status}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm font-medium">
        <a
          href={`${baseUrl}/${locale}/invoices/${inv.token}`}
          target="_blank"
          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Html View
        </a>
        {/* Only show edit link if the invoice is in DRAFT status */}
        {inv.status === "DRAFT" && (
          <a
            href={`/${locale}/invoices/${inv.token}/edit`}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Edit
          </a>
        )}
        {inv.status !== "DRAFT" && (
          <a
            href={`/${locale}/invoices/${inv.token}/propose_changes`}
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Propose Changes
          </a>
        )}
        {inv.status === "IN_PROGRESS" && (
          <>
            <form action={completeInvoice} className="inline">
              <input type="hidden" name="id" value={inv.id} />
              <button
                type="submit"
                className="font-medium text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
              >
                Complete
              </button>
            </form>
            <form action={cancelInvoice} className="inline">
              <input type="hidden" name="id" value={inv.id} />
              <button
                type="submit"
                className="font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                Cancel
              </button>
            </form>
          </>
        )}
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
