import { createInvoiceAction } from "../actions";
import EditInvoiceInfo from "./EditInvoiceInfo";
import InvoiceItemsManager from "./InvoiceItemsManager";
import Button from "@/app/components/Button";
import { Header } from "@/app/components/Headers";
import Label from "@/app/components/Label";

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
          <Button type="submit">Create</Button>
        </div>
      </form>
    </section>
  );
}
