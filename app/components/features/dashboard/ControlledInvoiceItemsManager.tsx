"use client";
import { SmallHeader } from "@/app/components/ui/Headers";

interface Item {
  description: string;
  quantity: number;
  unitCents: number;
}

interface InvoiceItemsManagerProps {
  items?: Item[];
  onItemChange: (items: Item[]) => void;
}

const REMOVE_BUTTON_WIDTH = 80; // alignment css purposes

export default function ControlledInvoiceItemsManager({
  items = [{ description: "Initial Item", quantity: 1, unitCents: 1000 }],
  onItemChange,
}: InvoiceItemsManagerProps) {
  const handleItemChange = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    const newItems = [...items];
    const itemToUpdate = { ...newItems[index] };

    // Convert value to a number if it's a numeric field
    const numericValue =
      typeof value === "string" ? parseInt(value, 10) || 0 : value;

    if (field === "description") {
      itemToUpdate[field] = value as string;
    } else {
      itemToUpdate[field] = numericValue;
    }

    newItems[index] = itemToUpdate;
    onItemChange(newItems);
  };

  const handleAddItem = () => {
    onItemChange([...items, { description: "", quantity: 1, unitCents: 1000 }]);
  };

  const handleRemoveItem = (indexToRemove: number) => {
    onItemChange(items.filter((_, index) => index !== indexToRemove));
  };
  return (
    <div className="flex max-w-4xl flex-col gap-4 mt-6 mb-6">
      <SmallHeader>Items</SmallHeader>

      {/* Header Row */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-300">
        <div className="flex-[3]">Description</div>{" "}
        <div className="flex-1">Quantity</div>
        <div className="flex-1">Price (cents)</div>
        <div style={{ width: `${REMOVE_BUTTON_WIDTH}px` }} />
      </div>

      {/* Item Rows */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            name={`item-${index}-description`}
            value={item.description}
            onChange={(e) =>
              handleItemChange(index, "description", e.target.value)
            }
            placeholder="Service or Product Description"
            className="block w-full flex-[3] rounded-md border-0 bg-root py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6  dark:text-white dark:ring-slate-700 dark:focus:ring-indigo-500"
          />
          <input
            type="number"
            name={`item-${index}-quantity`}
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(index, "quantity", e.target.value)
            }
            className="block w-full flex-1 rounded-md border-0 bg-root py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-white dark:ring-slate-700 dark:focus:ring-indigo-500"
          />
          <input
            type="number"
            name={`item-${index}-unitCents`}
            value={item.unitCents}
            onChange={(e) =>
              handleItemChange(index, "unitCents", e.target.value)
            }
            className="block w-full flex-1 rounded-md border-0 bg-root py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-white dark:ring-slate-700 dark:focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={() => handleRemoveItem(index)}
            style={{ width: `${REMOVE_BUTTON_WIDTH}px` }}
            className="rounded px-2 bg-transparent py-1 text-sm font-semibold text-red-600  transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/50"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddItem}
        className="mt-2 self-start rounded-md bg-foreground px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-300 dark:text-slate-200 dark:hover:bg-slate-600"
      >
        Add Item
      </button>
    </div>
  );
}
