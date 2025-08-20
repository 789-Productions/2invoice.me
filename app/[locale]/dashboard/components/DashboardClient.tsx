"use client";
import CreateInvoice from "./CreateInvoice";
import RecentInvoices from "./RecentInvoices";

export default function DashboardClient({
  clients,
  invoices,
  baseUrl,
  locale,
}: any) {
  return (
    // Main container with padding, background color, and vertical spacing between sections
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl space-y-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Dashboard
        </h1>

        <CreateInvoice clients={clients} />
        <RecentInvoices invoices={invoices} baseUrl={baseUrl} locale={locale} />
      </div>
    </main>
  );
}
