import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const email = "demo@example.com";
  const passwordHash = await bcrypt.hash("demo1234", 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash }
  });

  const client = await prisma.client.create({
    data: {
      userId: user.id,
      name: "ACME Corp",
      email: "billing@acme.test",
      locale: "en",
      currency: "USD"
    }
  });

  console.log("Seeded user:", user.email);
  console.log("Client id:", client.id);
}

main().then(() => process.exit(0)).catch((e) => {
  console.error(e);
  process.exit(1);
});