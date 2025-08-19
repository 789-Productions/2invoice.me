import { createInvoiceAction } from "../actions";
import EditInvoiceInfo from "./EditInvoiceInfo";
import InvoiceItemsManager from "./InvoiceItemsManager";

interface Client {
  id: number;
  name: string;
  email: string;
}

async function createInvoice(formData: FormData) {
  await createInvoiceAction({}, formData);
}

export default function CreateInvoice({ clients }: { clients: Array<Client> }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
        Create invoice
      </h2>
      <form
        action={createInvoice}
        // Using a grid for a responsive form layout
      >
        <EditInvoiceInfo invoice={null} clients={clients} />
        <InvoiceItemsManager />

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
  );
}
