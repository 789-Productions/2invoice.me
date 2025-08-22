'use server';

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function createClient(  
  prevState: string | undefined,
  formData: FormData,
  ) {
  try {
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const locale = formData.get('locale') as string;
    const session = await auth()
    if (!session) throw new Error("Unauthorized");
    const userId = session.userId as string;
    await prisma.client.create({
      data: { userId, email, name, locale },
    });

    console.log('Client created successfully!');
    revalidatePath('/');
    return "Client created successfully!";
  } catch (e) {
    console.error(e);
  }
}