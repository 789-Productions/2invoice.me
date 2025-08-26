"use client";

import { Client, Invoice } from "@/lib/generated/prisma/wasm";
import InvoiceHtmlItem from "./InvoiceHtmlItem";
import { SmallHeader, Header } from "@/app/components/Headers";
import { useState } from "react";

export default function ClientList({
  clients,
  clientInvoices,
}: {
  clients: Client[];
  clientInvoices: { [key: string]: Invoice[] };
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
            <button onClick={() => onClickClient(String(client.id))}>
              <SmallHeader>
                {client.name} ({client.email})
              </SmallHeader>
            </button>
            {selectedClientList.includes(String(client.id)) && (
              <>
                <SmallHeader>Invoices for {client.name}</SmallHeader>
                <ul>
                  {clientInvoices[client.id].map((invoice) => (
                    <InvoiceHtmlItem
                      key={invoice.id}
                      inv={invoice}
                      locale="en"
                    />
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
