"use client";
import { useEffect, useRef, useState } from "react";
import Label from "@/app/components/Label";
import { SortType, SortOrder } from "@/lib/data";

const takeAmountOptions: number[] = [5, 10, 20, 50, 100];
export const InvoiceSortSelector = ({
  handleSort,
}: {
  handleSort: (
    sortType: SortType,
    sortOrder: SortOrder,
    takeAmount: number
  ) => void;
}) => {
  const [sortType, setSortType] = useState<SortType>("issueDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [takeAmount, setTakeAmount] = useState<number>(10);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      console.log("Initial mount");
      return;
    }
    // only run when sorts are changed not on initial mount
    handleSort(sortType, sortOrder, takeAmount);
  }, [sortType, sortOrder, takeAmount]);
  return (
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
    </div>
  );
};
