"use client";
import {
  completeInvoiceAction,
  deleteInvoiceAction,
} from "@/app/[locale]/dashboard/actions";
import { cancelInvoiceAction } from "@/app/[locale]/invoices/[token]/confirm/actions";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const ViewActionButton = ({
  baseUrl,
  locale,
  inv,
}: {
  baseUrl: string;
  locale: string;
  inv: any;
}) => {
  return (
    <>
      <a
        href={`${baseUrl}/${locale}/invoices/${inv.token}`}
        target="_blank"
        className="font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        View
      </a>
    </>
  );
};
const EditActionButton = ({
  baseUrl,
  locale,
  inv,
}: {
  baseUrl: string;
  locale: string;
  inv: any;
}) => (
  <>
    <a
      href={`${baseUrl}/${locale}/invoices/${inv.token}/edit`}
      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
    >
      Edit
    </a>
  </>
);

const ProposeChangesActionButton = ({
  locale,
  inv,
}: {
  locale: string;
  inv: any;
}) => (
  <>
    <a
      href={`/${locale}/invoices/${inv.token}/propose_changes`}
      className="font-medium text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300"
    >
      Propose Changes
    </a>
  </>
);

const CompleteActionButton = ({
  completeInvoice,
  inv,
}: {
  completeInvoice: (formData: FormData) => Promise<void>;
  inv: any;
}) => (
  <>
    <form action={completeInvoice}>
      <input type="hidden" name="id" value={inv.id} />
      <button type="submit" className="cursor-pointer" title="Complete">
        <Image
          src="/images/check-mark.svg"
          alt="Complete"
          width={16}
          height={16}
        />
      </button>
    </form>
  </>
);

const CancelActionButton = ({
  cancelInvoice,
  inv,
}: {
  cancelInvoice: () => Promise<void>;
  inv: any;
}) => (
  <>
    <form
      action={cancelInvoice}
      className="inline cursor-pointer font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
    >
      <input type="hidden" name="id" value={inv.id} />
      <button type="submit">Cancel</button>
    </form>
  </>
);

const DeleteActionButton = ({
  deleteInvoice,
  inv,
}: {
  deleteInvoice: (formData: FormData) => Promise<void>;
  inv: any;
}) => (
  <>
    <form action={deleteInvoice}>
      <input type="hidden" name="id" value={inv.id} />
      <button type="submit" className="cursor-pointer" title="Delete">
        <Image
          src="/images/trash-can.svg"
          alt="Delete"
          width={16}
          height={16}
        />
      </button>
    </form>
  </>
);

type InvoiceStatus = "DRAFT" | "IN_PROGRESS" | "COMPLETED" | "PENDING";
const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const locale = "en";
const deleteInvoice = async (formData: FormData) => {
  await deleteInvoiceAction({}, formData);
};
const completeInvoice = async (formData: FormData) => {
  await completeInvoiceAction({}, formData);
};

const OutsideActionButtons = ({
  status,
  inv,
}: {
  status: InvoiceStatus;
  inv: any;
}) => {
  const actionMap: Record<
    InvoiceStatus,
    Array<{ component: React.FC<any>; props: any }>
  > = {
    DRAFT: [{ component: DeleteActionButton, props: { deleteInvoice, inv } }],
    IN_PROGRESS: [
      { component: CompleteActionButton, props: { completeInvoice, inv } },
      { component: DeleteActionButton, props: { deleteInvoice, inv } },
    ],
    PENDING: [{ component: DeleteActionButton, props: { deleteInvoice, inv } }],
    COMPLETED: [
      { component: DeleteActionButton, props: { deleteInvoice, inv } },
    ],
  };
  return (
    <>
      {actionMap[status].map(({ component: ActionComponent, props }, index) => (
        <ActionComponent key={index} {...props} />
      ))}
    </>
  );
};

const MoreInvoiceActions = ({
  status,
  inv,
}: {
  status: InvoiceStatus;
  inv: any;
}) => {
  const cancelInvoice = async () => {
    await cancelInvoiceAction(inv.id);
  };
  const moreActionMap: Record<
    InvoiceStatus,
    Array<{ component: React.FC<any>; props: any }>
  > = {
    DRAFT: [
      { component: ViewActionButton, props: { baseUrl, locale, inv } },
      { component: EditActionButton, props: { baseUrl, locale, inv } },
    ],
    IN_PROGRESS: [
      { component: ViewActionButton, props: { baseUrl, locale, inv } },
      { component: ProposeChangesActionButton, props: { locale, inv } },
    ],
    PENDING: [
      { component: ViewActionButton, props: { baseUrl, locale, inv } },
      { component: ProposeChangesActionButton, props: { locale, inv } },
      { component: CancelActionButton, props: { cancelInvoice, inv } },
      { component: DeleteActionButton, props: { deleteInvoice, inv } },
    ],
    COMPLETED: [
      { component: ViewActionButton, props: { baseUrl, locale, inv } },
      { component: DeleteActionButton, props: { deleteInvoice, inv } },
    ],
  };
  const moreActions = moreActionMap[status];
  if (!moreActions) return null;
  return (
    <div className="py-1 flex flex-col bg-slate-800">
      {moreActions.map(({ component: ActionComponent, props }, index) => (
        <ActionComponent key={index} {...props} />
      ))}
    </div>
  );
};

const InvoiceActions = ({
  status,
  inv,
}: {
  status: InvoiceStatus;
  inv: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <>
      <div className="relative flex items-center gap-x-3" ref={dropdownRef}>
        <OutsideActionButtons status={status} inv={inv} />
        <div className="flex-column ">
          <button onClick={toggleDropdown} title="More options">
            <Image
              src="/images/options.svg"
              alt="More"
              width={16}
              height={16}
            />
          </button>
          {/* Dropdown menu, show/hide based on menu state. */}
          {isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg border-2 border-gray-500">
              <MoreInvoiceActions status={status} inv={inv} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default function InvoiceHtmlItem({ inv }: { inv: any }) {
  const today = new Date().valueOf();
  // to determine if the invoice is overdue
  const differenceInDays = Math.ceil(
    (today - inv.dueDate.valueOf()) / (1000 * 60 * 60 * 24)
  );
  const addCommasToNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <li
      key={inv.id}
      className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm dark:bg-slate-800"
    >
      <div>
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-50">
            #{inv.number} — {inv.client.name}{" "}
          </p>
        </div>
        <div className="flex gap-1">
          <p className="text-sm text-green-600 dark:text-green-600">
            ${addCommasToNumber(inv.totalCents / 100)}
            {"."}
            {(inv.totalCents / 100).toFixed(2).slice(-2)} {inv.currency}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {" | "}
            {"Due: " + inv.dueDate.toDateString()}
          </p>
          {differenceInDays > 0 && (
            <p className="text-sm text-red-500"> ( Outstanding )</p>
          )}
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {" | "}
            {"Status: " + inv.status}
          </p>
        </div>
      </div>
      {/* Actions that are taken on the invoice based on its status */}
      <div>{InvoiceActions({ status: inv.status, inv })}</div>
    </li>
  );
}
