'use server';

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function seedDatabase(FormData: FormData) {
  try {
    const email = 'demo@example.com';
    const passwordHash = await bcrypt.hash('demo1234', 10);

    // Use upsert to avoid creating duplicate users on multiple clicks
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email, passwordHash },
    });

    // Create a client for the user
    await prisma.client.create({
      data: {
        userId: user.id,
        name: 'ACME Corp',
        email: 'billing@acme.test',
      },
      
    });

    console.log('Database seeded successfully!');
    revalidatePath('/');
  } catch (e) {
    console.error(e);
  }
}