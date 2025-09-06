type InvoiceItem = {
  id: number;
  description: string;
  quantity: number;
  unitCents: number;
};
const TABLE_STYLE = "table-fixed mb-4 border-collapse";
const HEADER_STYLE = "p-2 font-bold";
const DATA_STYLE = "border-t p-2";

const DESC_COL = "w-32";
const UNIT_COL = "w-24";
const QTY_COL = "w-12 ";
const TOTAL_COL = "w-24";
const ARROW_COL = "w-12 text-center";

// oldItems.map((item, index) => (
//           <tr key={`old-${index}`}>
//             <td className={OLD_TABLE_DATA_STYLE}>{item.description}</td>
//             <td className={OLD_TABLE_DATA_STYLE}>
//               {fmt.format(item.unitCents / 100)}
//             </td>
//             <td className={OLD_TABLE_DATA_STYLE}>{item.quantity}</td>
//             <td className={OLD_TABLE_DATA_STYLE}>
//               {fmt.format((item.unitCents * item.quantity) / 100)}
//             </td>
//           </tr>
//         ))

export default function DisplayOldAndNewItems({
  oldItems,
  newItems,
  allItems, // for debugging
}: {
  oldItems: InvoiceItem[];
  newItems: InvoiceItem[];
  allItems: InvoiceItem[]; // for debugging
}) {
  const rows = [];
  const fmt = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const unchangedItems = allItems.filter((item) => {
    return !oldItems.find((oldItem) => oldItem.id === item.id);
  });
  return (
    <>
      {unchangedItems.length > 0 && (
        <div key="unchanged" className="py-1 font-bold">
          <span className="text-gray-400 mr-4">Unchanged Items</span>
          <table key="unchanged-table" className={TABLE_STYLE}>
            <thead>
              <tr>
                <th
                  className={`${HEADER_STYLE} text-left text-white font-bold text-white ${DESC_COL}`}
                >
                  Description
                </th>
                <th
                  className={`${HEADER_STYLE} text-left text-white font-bold text-white ${UNIT_COL}`}
                >
                  Unit Price
                </th>
                <th
                  className={`${HEADER_STYLE} text-left text-white font-bold text-white ${QTY_COL}`}
                >
                  Qty
                </th>
                <th
                  className={`${HEADER_STYLE} text-left text-white font-bold text-white ${TOTAL_COL}`}
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {unchangedItems.map((item, index) => (
                <tr key={`unchanged-${index}`}>
                  <td className={`${DATA_STYLE} text-white`}>
                    {item.description}
                  </td>
                  <td className={`${DATA_STYLE} text-white`}>
                    {fmt.format(item.unitCents / 100)}
                  </td>
                  <td className={`${DATA_STYLE} text-white`}>
                    {item.quantity}
                  </td>
                  <td className={`${DATA_STYLE} text-white`}>
                    {fmt.format((item.unitCents * item.quantity) / 100)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div key="side_by_side_tables" className="flex gap-8 mb-4 items-start">
        <table key="old_item_table" className={TABLE_STYLE}>
          <thead>
            {/** Distinguish new and old*/}
            <tr>
              <th
                colSpan={4}
                className={`${HEADER_STYLE} text-center text-red-400 text-lg border-b-2 border-red-500`}
              >
                Old Items
              </th>
              <th className="border-b-2 border-slate-500"></th>{" "}
              {/* Empty cell for the gap */}
              <th
                colSpan={4}
                className={`${HEADER_STYLE} text-center text-green-400 text-lg border-b-2 border-green-500`}
              >
                New Items
              </th>
            </tr>
            <tr>
              {/* old item headers */}
              <th
                className={`${HEADER_STYLE} text-left font-bold text-white ${DESC_COL}`}
              >
                Description
              </th>
              <th
                className={`${HEADER_STYLE} text-left font-bold text-white ${UNIT_COL}`}
              >
                Unit Price
              </th>
              <th
                className={`${HEADER_STYLE} text-left font-bold text-white ${QTY_COL}`}
              >
                Qty
              </th>
              <th
                className={`${HEADER_STYLE} text-left font-bold text-white ${TOTAL_COL}`}
              >
                Total
              </th>
              {/* Gap */}
              <th className={ARROW_COL}></th>
              {/* new item headers */}
              <th
                className={`${HEADER_STYLE} text-left font-bold text-white ${DESC_COL}`}
              >
                Description
              </th>
              <th
                className={`${HEADER_STYLE} text-left  font-bold text-white ${UNIT_COL}`}
              >
                Unit Price
              </th>
              <th
                className={`${HEADER_STYLE} text-left font-bold text-white ${QTY_COL}`}
              >
                Qty
              </th>
              <th
                className={`${HEADER_STYLE} text-left font-bold text-white ${TOTAL_COL}`}
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {oldItems.map((oldItem, index) => {
              const newItem = newItems[index];
              return (
                <tr key="compared-row">
                  {/* --- Old Item Data --- */}
                  <td className={`${DATA_STYLE} text-red-500`}>
                    {oldItem.description}
                  </td>
                  <td className={`${DATA_STYLE} text-red-500`}>
                    {fmt.format(oldItem.unitCents / 100)}
                  </td>
                  <td className={`${DATA_STYLE} text-red-500`}>
                    {oldItem.quantity}
                  </td>
                  <td className={`${DATA_STYLE} text-red-500`}>
                    {fmt.format((oldItem.unitCents * oldItem.quantity) / 100)}
                  </td>

                  {/* --- The Arrow --- */}
                  <td className={`${DATA_STYLE} text-2xl`}>→</td>

                  {/* --- New Item Data --- */}
                  <td className={`${DATA_STYLE} text-green-500`}>
                    {newItem.description}
                  </td>
                  <td className={`${DATA_STYLE} text-green-500`}>
                    {fmt.format(newItem.unitCents / 100)}
                  </td>
                  <td className={`${DATA_STYLE} text-green-500`}>
                    {newItem.quantity}
                  </td>
                  <td className={`${DATA_STYLE} text-green-500`}>
                    {fmt.format((newItem.unitCents * newItem.quantity) / 100)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );

  // headers for old and new
  // rows.push(
  //   <div key="header" className="py-1 font-bold">
  //     <span className="text-red-500 mr-4">Old Items</span>
  //     <span className="text-green-500">New Items</span>
  //   </div>
  // );

  // start the two table

  rows.push(
    <div key="side_by_side_tables" className="flex gap-8 mb-4 items-start">
      <table key="old_item_table" className={TABLE_STYLE}>
        <thead>
          {/** Distinguish new and old*/}
          <tr>
            <th
              colSpan={4}
              className={`${HEADER_STYLE} text-center text-red-400 text-lg border-b-2 border-red-500`}
            >
              Old Items
            </th>
            <th className="border-b-2 border-slate-500"></th>{" "}
            {/* Empty cell for the gap */}
            <th
              colSpan={4}
              className={`${HEADER_STYLE} text-center text-green-400 text-lg border-b-2 border-green-500`}
            >
              New Items
            </th>
          </tr>
          <tr>
            {/* old item headers */}
            <th
              className={`${HEADER_STYLE} text-left font-bold text-white ${DESC_COL}`}
            >
              Description
            </th>
            <th
              className={`${HEADER_STYLE} text-left font-bold text-white ${UNIT_COL}`}
            >
              Unit Price
            </th>
            <th
              className={`${HEADER_STYLE} text-left font-bold text-white ${QTY_COL}`}
            >
              Qty
            </th>
            <th
              className={`${HEADER_STYLE} text-left font-bold text-white ${TOTAL_COL}`}
            >
              Total
            </th>
            {/* Gap */}
            <th className={ARROW_COL}></th>
            {/* new item headers */}
            <th
              className={`${HEADER_STYLE} text-left font-bold text-white ${DESC_COL}`}
            >
              Description
            </th>
            <th
              className={`${HEADER_STYLE} text-left  font-bold text-white ${UNIT_COL}`}
            >
              Unit Price
            </th>
            <th
              className={`${HEADER_STYLE} text-left font-bold text-white ${QTY_COL}`}
            >
              Qty
            </th>
            <th
              className={`${HEADER_STYLE} text-left font-bold text-white ${TOTAL_COL}`}
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {oldItems.map((oldItem, index) => {
            const newItem = newItems[index];
            return (
              <tr key="compared-row">
                {/* --- Old Item Data --- */}
                <td className={`${DATA_STYLE} text-red-500`}>
                  {oldItem.description}
                </td>
                <td className={`${DATA_STYLE} text-red-500`}>
                  {fmt.format(oldItem.unitCents / 100)}
                </td>
                <td className={`${DATA_STYLE} text-red-500`}>
                  {oldItem.quantity}
                </td>
                <td className={`${DATA_STYLE} text-red-500`}>
                  {fmt.format((oldItem.unitCents * oldItem.quantity) / 100)}
                </td>

                {/* --- The Arrow --- */}
                <td className={`${DATA_STYLE} text-2xl`}>→</td>

                {/* --- New Item Data --- */}
                <td className={`${DATA_STYLE} text-green-500`}>
                  {newItem.description}
                </td>
                <td className={`${DATA_STYLE} text-green-500`}>
                  {fmt.format(newItem.unitCents / 100)}
                </td>
                <td className={`${DATA_STYLE} text-green-500`}>
                  {newItem.quantity}
                </td>
                <td className={`${DATA_STYLE} text-green-500`}>
                  {fmt.format((newItem.unitCents * newItem.quantity) / 100)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
  return rows;
}
