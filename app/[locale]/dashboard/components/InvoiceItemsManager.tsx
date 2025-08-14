"use client";
import { useState } from "react";

interface Item {
  description: string;
  quantity: number;
  unitCents: number;
}

interface InvoiceItemsManagerProps {
  initialItems?: Item[];
}

const REMOVE_BUTTON_WIDTH = 80; // alignment css purposes

export default function InvoiceItemsManager({
  initialItems,
}: InvoiceItemsManagerProps) {
  const [items, setItems] = useState<Array<Item>>(
    initialItems || [
      { description: "Initial Item", quantity: 1, unitCents: 1000 },
    ]
  );

  // Handles changes to any input field for any item
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
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { description: "", quantity: 1, unitCents: 0 }]);
  };

  const handleRemoveItem = (indexToRemove: number) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        maxWidth: "750px",
      }}
    >
      <label style={{ fontWeight: "bold" }}>Items</label>

      {/* Header Row */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          paddingBottom: "4px",
          borderBottom: "1px solid #ccc",
          color: "#555",
          fontSize: "0.9rem",
        }}
      >
        <div style={{ flex: 1, fontWeight: "bold" }}>Description</div>
        <div style={{ flex: 1, fontWeight: "bold" }}>Quantity</div>
        <div style={{ flex: 1, fontWeight: "bold" }}>Price (cents)</div>
        {/* Placeholder for the remove button to keep alignment */}
        <div style={{ width: `${REMOVE_BUTTON_WIDTH}px` }}></div>
      </div>

      {/* Item Rows */}
      {items.map((item, index) => (
        <div
          key={index}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <input
            type="text"
            name={`item-${index}-description`}
            value={item.description}
            onChange={(e) =>
              handleItemChange(index, "description", e.target.value)
            }
            placeholder="Service or Product"
            style={{ flex: 1 }}
          />
          <input
            type="number"
            name={`item-${index}-quantity`}
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(index, "quantity", e.target.value)
            }
            style={{ flex: 1 }}
          />
          <input
            type="text"
            name={`item-${index}-unitCents`}
            value={item.unitCents}
            onChange={(e) =>
              handleItemChange(index, "unitCents", e.target.value)
            }
            style={{ flex: 1 }}
          />

          <button
            type="button"
            onClick={() => handleRemoveItem(index)}
            style={{ width: `${REMOVE_BUTTON_WIDTH}px` }}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddItem}
        style={{
          alignSelf: "flex-start",
          marginTop: "6px",
          marginBottom: "2px",
        }}
      >
        Add Item
      </button>
    </div>
  );
}
