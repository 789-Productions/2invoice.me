"use client";

import { client, invoice } from "@/lib/generated/prisma/wasm";
import InvoiceHtmlItem from "./InvoiceHtmlItem";
import { SmallHeader, Header } from "@/app/components/ui/Headers";
import { useState } from "react";

export default function ClientList({
  clients,
  clientInvoices,
}: {
  clients: client[];
  clientInvoices: { [key: string]: invoice[] };
}) {
  const [selectedClientList, setSelectedClientList] = useState<string[]>([]);
  const onClickClient = (clientId: string) => {
    if (selectedClientList.includes(clientId)) {
      setSelectedClientList(selectedClientList.filter((id) => id !== clientId));
    } else {
      setSelectedClientList([...selectedClientList, clientId]);
    }
  };

  return (
    <div>
      <Header>Clients</Header>
      <br />
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <button
              className="flex justify-between w-1/2 text-left bg-cyan-700 rounded-md mb-2 p-1 border-2 border-cyan-800 hover:border-3 hover:border-cyan-900 hover:bg-cyan-900 hover:shadow-md"
              onClick={() => onClickClient(String(client.id))}
            >
              <SmallHeader>
                {client.name} ({client.email}){" "}
              </SmallHeader>
              <SmallHeader>
                {selectedClientList.includes(String(client.id)) ? "-" : "+"}
              </SmallHeader>
            </button>
            {/* if the client is selected, show their invoices */}
            {selectedClientList.includes(String(client.id)) && (
              <>
                {clientInvoices[client.id] &&
                clientInvoices[client.id].length > 0 ? (
                  <>
                    <SmallHeader>Invoices for {client.name}</SmallHeader>
                    <ul className="mb-4 mt-2 space-y-2">
                      {clientInvoices[client.id].map((invoice) => (
                        <InvoiceHtmlItem key={invoice.id} inv={invoice} />
                      ))}
                    </ul>
                  </>
                ) : (
                  <SmallHeader>No invoices found</SmallHeader>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
