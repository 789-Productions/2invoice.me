import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import Text from "../../components/Text";

const ProfilePage = async () => {
  const session = await auth();
  if (!session) {
    return <div>Please log in to view this page.</div>;
  }
  const user = await prisma.user.findUnique({
    where: { id: session?.userId },
  });
  if (!user) {
    return <div>User not found.</div>;
  }
  return (
    <Text>
      Go to{" "}
      <a href={`/en/profile/${user?.email}`}>{`/en/profile/${user?.email}`}</a>
    </Text>
  );
};

export default ProfilePage;
