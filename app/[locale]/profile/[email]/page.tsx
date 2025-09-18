import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import ProfilePage from "../../../components/features/profile/email/ProfilePage";
import { getClients, getRecentInvoices } from "@/lib/data";
import { invoice } from "@/lib/generated/prisma/wasm";
import { InvoiceClient } from "../../../components/features/profile/email/InvoiceClient";

type Params = Promise<{ email: string; locale: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { email, locale } = await params;
  const decodedEmail = decodeURIComponent(email);
  // run in parallel to speed up
  const [user, session, clients, invoices] = await Promise.all([
    prisma.user.findUnique({
      where: { email: decodedEmail },
    }),
    auth(),
    getClients(),
    getRecentInvoices(),
  ]);

  const viewingSelf = decodedEmail === session?.user?.email;
  // dont make a seperate query for each client, instead get all invoices and group them by client
  const clientIds = clients.map((client) => client.id);
  const allInvoices = await prisma.invoice.findMany({
    where: { clientId: { in: clientIds } },
    include: { client: true },
  });
  const clientInvoices = allInvoices.reduce((acc, invoice) => {
    const key = invoice.clientId;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(invoice);
    return acc;
  }, {} as { [key: string]: typeof allInvoices });
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
