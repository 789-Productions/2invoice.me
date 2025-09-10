import { createInvoiceAction } from "../../../[locale]/dashboard/actions";
import EditInvoiceInfo from "./EditInvoiceInfo";
import InvoiceItemsManager from "./InvoiceItemsManager";
import Button from "@/app/components/ui/Button";
import { Header } from "@/app/components/ui/Headers";
import { useState } from "react";

interface Client {
  id: number;
  name: string;
  email: string;
}

async function createInvoice(formData: FormData) {
  await createInvoiceAction({}, formData);
}

export default function CreateInvoice({ clients }: { clients: Array<Client> }) {
  const [invoiceStatus, setInvoiceStatus] = useState("draft");
  return (
    <section>
      <Header>Create invoice</Header>
      <form
        action={createInvoice}
        // Using a grid for a responsive form layout
      >
        <div className="grid rounded mt-2 border-1 border-gray-600">
          <div className="p-4">
            <EditInvoiceInfo invoice={null} clients={clients} />
          </div>
          <div className="p-4">
            <InvoiceItemsManager />
          </div>
        </div>
        <div className="sm:col-span-6 mt-2">
          <Button type="submit">Create as</Button>
          <select
            className="ml-2 rounded border border-slate-500 bg-slate-700 text-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            value={invoiceStatus}
            name="status"
            onChange={(e) => setInvoiceStatus(e.target.value)}
          >
            <option value="DRAFT">Draft</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
      </form>
    </section>
  );
}
