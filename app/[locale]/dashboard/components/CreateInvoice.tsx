import { createInvoiceAction } from "../actions";
import EditInvoiceInfo from "./EditInvoiceInfo";
import InvoiceItemsManager from "./InvoiceItemsManager";
import Button from "@/app/components/Button";
import { Header } from "@/app/components/Headers";

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
        <EditInvoiceInfo invoice={null} clients={clients} />
        <InvoiceItemsManager />

        <div className="sm:col-span-6 sm">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </section>
  );
}
