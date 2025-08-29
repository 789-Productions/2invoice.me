"use client";
import { Header } from "@/app/components/Headers";
import Button from "@/app/components/Button";
import { InvoiceSortSelector } from "./InvoiceSortSelector";
import InvoiceList from "@/app/[locale]/components/InvoiceList";
import { useState } from "react";
import { Invoice } from "@/lib/generated/prisma/wasm";
import { SortType, SortOrder } from "@/lib/data";
import { fetchSortedInvoices } from "../actions";
import Text from "@/app/components/Text";

export const InvoiceClient = ({
  initialInvoices,
  locale,
}: {
  initialInvoices: Invoice[];
  locale: string;
}) => {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInvoices, setShowInvoices] = useState<boolean>(false);
  const handleSort = async (
    sortType: SortType,
    sortOrder: SortOrder,
    takeAmount: number
  ) => {
    setIsLoading(true);
    const sortedInvoices = await fetchSortedInvoices(
      sortType,
      sortOrder,
      takeAmount
    );
    setInvoices(sortedInvoices);
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex justify-between gap-1 mt-2">
        <Header>Invoices</Header>
        <Button className="mb-2" onClick={() => setShowInvoices(!showInvoices)}>
          {showInvoices ? "Hide Invoices" : "Show Invoices"}
        </Button>
      </div>
      {showInvoices && (
        <div className={showInvoices ? "block" : "hidden"}>
          <InvoiceSortSelector handleSort={handleSort} />
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <InvoiceList invoices={invoices} locale={locale} />
          )}
        </div>
      )}
    </>
  );
};
