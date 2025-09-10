"use client";
import { Header } from "@/app/components/ui/Headers";
import Button from "@/app/components/ui/Button";
import { InvoiceSortSelector } from "./InvoiceSortSelector";
import InvoiceList from "@/app/components/general/InvoiceList";
import { useState } from "react";
import { invoice } from "@/lib/generated/prisma/wasm";
import { InvoiceStatus } from "@/lib/generated/prisma";
import { SortType, SortOrder } from "@/lib/data";
import { fetchSortedInvoices } from "../../../../[locale]/profile/[email]/actions";
import Text from "@/app/components/ui/Text";

type InvoiceStatusSearch = InvoiceStatus | "ANY";

export const InvoiceClient = ({
  initialInvoices,
  locale,
}: {
  initialInvoices: invoice[];
  locale: string;
}) => {
  const [invoices, setInvoices] = useState<invoice[]>(initialInvoices);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showInvoices, setShowInvoices] = useState<boolean>(false);
  const handleSort = async (
    sortType: SortType,
    sortOrder: SortOrder,
    takeAmount: number,
    invoiceStatus: InvoiceStatusSearch,
    min_price: number | undefined = undefined,
    max_price: number | undefined = undefined
  ) => {
    setIsLoading(true);
    const sortedInvoices = await fetchSortedInvoices(
      sortType,
      sortOrder,
      takeAmount,
      invoiceStatus,
      min_price,
      max_price
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
          ) : invoices.length === 0 ? (
            <Text>No invoices found.</Text>
          ) : (
            <InvoiceList invoices={invoices} locale={locale} />
          )}
        </div>
      )}
    </>
  );
};
