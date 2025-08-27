import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import ProfilePage from "./components/ProfilePage";
import { getClients } from "@/lib/data";
import { Invoice } from "@/lib/generated/prisma/wasm";

const Page = async ({ params }: { params: { email: string } }) => {
  await params;
  const { email } = params;
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
  return (
    <ProfilePage
      user={user}
      clients={clients}
      viewingSelf={viewingSelf}
      clientInvoices={clientInvoices}
    />
  );
};

export default Page;
