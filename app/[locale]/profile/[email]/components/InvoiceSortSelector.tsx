"use client";
import { useEffect, useRef, useState } from "react";
import Label from "@/app/components/Label";
import { SortType, SortOrder } from "@/lib/data";
import { InvoiceStatus } from "@/lib/generated/prisma";

type InvoiceStatusSearch = InvoiceStatus | "ANY";

const takeAmountOptions: number[] = [5, 10, 20, 50, 100];
export const InvoiceSortSelector = ({
  handleSort,
}: {
  handleSort: (
    sortType: SortType,
    sortOrder: SortOrder,
    takeAmount: number,
    invoiceStatus: InvoiceStatusSearch,
    min_price: number | undefined,
    max_price: number | undefined
  ) => void;
}) => {
  const [sortType, setSortType] = useState<SortType>("issueDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [takeAmount, setTakeAmount] = useState<number>(10);
  const [invoiceStatus, setInvoiceStatus] =
    useState<InvoiceStatusSearch>("ANY");
  const [minPriceSearch, setMinPriceSearch] = useState<number | undefined>(
    undefined
  );
  const [maxPriceSearch, setMaxPriceSearch] = useState<number | undefined>(
    undefined
  );
  const [showAdvancedFilters, setShowAdvancedFilters] =
    useState<boolean>(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      console.log("Initial mount");
      return;
    }
    // only run when sorts are changed not on initial mount
    handleSort(
      sortType,
      sortOrder,
      takeAmount,
      invoiceStatus,
      minPriceSearch,
      maxPriceSearch
    );
  }, [
    sortType,
    sortOrder,
    takeAmount,
    invoiceStatus,
    minPriceSearch,
    maxPriceSearch,
  ]);
  return (
    <div className="mb-4">
      <div className="flex items-center space-x-4 text-white mb-1">
        <Label htmlFor="sort">Sort by:</Label>
        <select
          id="sort"
          value={sortType}
          className="border border-gray-300 rounded-md p-2 bg-slate-900"
          onChange={(e) => setSortType(e.target.value as SortType)}
        >
          <option value="number">Invoice Number</option>
          <option value="issueDate">Issue Date</option>
          <option value="dueDate">Due Date</option>
          <option value="totalCents">Total Amount</option>
        </select>
        <select
          id="order"
          value={sortOrder}
          className="border border-gray-300 rounded-md p-2 bg-slate-900"
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <Label htmlFor="takeAmount">Take:</Label>
        <select
          id="takeAmount"
          value={takeAmount}
          onChange={(e) => setTakeAmount(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-2 bg-slate-900"
        >
          {takeAmountOptions.map((amount) => (
            <option key={amount} value={amount}>
              {amount}
            </option>
          ))}
        </select>
        <Label htmlFor="invoiceStatus">Status:</Label>
        <select
          id="invoiceStatus"
          value={invoiceStatus}
          onChange={(e) =>
            setInvoiceStatus(e.target.value as InvoiceStatusSearch)
          }
          className="border border-gray-300 rounded-md p-2 bg-slate-900"
        >
          <option value="ANY">Any</option>
          {Object.values(InvoiceStatus).map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() +
                status.toLowerCase().replace(/_/g, " ").slice(1)}
            </option>
          ))}
        </select>
        <button
          className="bg-indigo-900 text-white px-2 py-1 rounded hover:bg-indigo-800"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          Go to Advanced Filters
        </button>
      </div>
      {showAdvancedFilters && (
        <div className="flex items-center space-x-4 text-white mb-1">
          <Label htmlFor="price_range">Price:</Label>
          $
          <input
            id="min_price_range"
            type="text"
            className="border border-gray-300 rounded-md p-1 flex max-w-20 bg-slate-900"
            placeholder="Min"
            defaultValue={minPriceSearch ? minPriceSearch : ""}
            onBlur={(e) =>
              setMinPriceSearch(Number(e.target.value) || undefined)
            }
          />
          <p> to </p>
          $
          <input
            id="max_price_range"
            type="text"
            className="border border-gray-300 rounded-md p-1 flex max-w-20 bg-slate-900"
            placeholder="Max"
            defaultValue={maxPriceSearch ? maxPriceSearch : ""}
            onBlur={(e) =>
              setMaxPriceSearch(Number(e.target.value) || undefined)
            }
          />
        </div>
      )}
    </div>
  );
};
