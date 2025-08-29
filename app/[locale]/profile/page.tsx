import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth();
  if (!session) {
    redirect(`/en/auth/signin`);
  }
  const user = await prisma.user.findUnique({
    where: { id: session?.userId },
  });
  if (!user || !user.email) {
    return <div>User not found.</div>;
  }
  redirect(`/en/profile/${user.email}`);
};

export default ProfilePage;
