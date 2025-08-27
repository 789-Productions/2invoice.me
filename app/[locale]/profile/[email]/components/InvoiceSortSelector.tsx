"use client";
import { useEffect, useState } from "react";
import Label from "@/app/components/Label";
import { SortType, SortOrder } from "@/lib/data";
export const InvoiceSortSelector = ({
  handleSort,
}: {
  handleSort: (sortType: SortType, sortOrder: SortOrder) => void;
}) => {
  const [sortType, setSortType] = useState<SortType>("issueDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  useEffect(() => {
    handleSort(sortType, sortOrder);
  }, [sortType, sortOrder]);
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
    </div>
  );
};
