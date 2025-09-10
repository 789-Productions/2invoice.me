import { invoice } from "@/lib/generated/prisma/wasm";
import { useParams, useRouter } from "next/navigation";
import Button from "../../ui/Button";
import Label from "@/app/components/ui/Label";
import { SmallHeader } from "@/app/components/ui/Headers";

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
  invoice: invoice | null;
}) {
  const { locale } = useParams();
  const router = useRouter();
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
        <SmallHeader>Client Info</SmallHeader>
      </div>
      <div className="sm:col-span-4">
        <Label htmlFor="clientId">Client</Label>
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
      <div className="sm:col-span-2">
        <Button
          type="button" // to not submit underlying form this component is in
          className="mt-2"
          onClick={() => router.push(`/${locale}/client/new`)}
        >
          Add Client
        </Button>
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor="number">Number</Label>
        <input
          type="text"
          id="number"
          name="number"
          defaultValue={defaultValues.number}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor="currency">Currency</Label>
        <input
          type="text"
          id="currency"
          name="currency"
          defaultValue={defaultValues.currency}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor="issueDate">Issue Date</Label>
        <input
          type="date"
          id="issueDate"
          name="issueDate"
          defaultValue={defaultValues.issueDate}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor="dueDate">Due Date</Label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          defaultValue={defaultValues.dueDate}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />
      </div>
    </section>
  );
}
