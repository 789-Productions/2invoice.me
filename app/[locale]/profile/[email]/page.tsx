import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import ProfilePage from "../../components/ProfilePage";

const Page = async ({ params }: { params: { email: string } }) => {
  await params;
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);
  console.log("Email:", decodedEmail);
  const user = await prisma.user.findUnique({
    where: { email: decodedEmail },
  });

  console.log("User:", user);
  const session = await auth();
  const viewingSelf = decodedEmail === session?.user?.email;
  console.log("Viewing self:", viewingSelf);

  return <ProfilePage user={user} viewingSelf={viewingSelf} />;
};

export default Page;
