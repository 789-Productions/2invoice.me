import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import ProfilePage from "./components/ProfilePage";
import {
  getClients,
  getInvoiceBySortInfo,
  getRecentInvoices,
} from "@/lib/data";
import { Invoice } from "@/lib/generated/prisma/wasm";
import { InvoiceClient } from "./components/InvoiceClient";

const Page = async ({
  params,
}: {
  params: { email: string; locale: string };
}) => {
  await params;
  const { email, locale } = params;
  const decodedEmail = decodeURIComponent(email);
  const user = await prisma.user.findUnique({
    where: { email: decodedEmail },
  });

  const session = await auth();
  const viewingSelf = decodedEmail === session?.user?.email;
  const clients = await getClients();
  let clientInvoices: { [key: string]: Invoice[] } = {};
  for (const client of clients) {
    clientInvoices[client.id] = await prisma.invoice.findMany({
      where: { clientId: client.id },
      include: { client: true },
    });
  }
  const invoices = await getRecentInvoices();
  return (
    <>
      <ProfilePage
        user={user}
        clients={clients}
        viewingSelf={viewingSelf}
        clientInvoices={clientInvoices}
      />
      <InvoiceClient initialInvoices={invoices} locale={locale} />
    </>
  );
};

export default Page;
