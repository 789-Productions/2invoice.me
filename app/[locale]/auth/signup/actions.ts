'use server';

import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function signUp(  
  prevState: string | undefined,
  formData: FormData,
  ) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const passwordHash = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return "User already exists. Please sign in.";
    }

    await prisma.user.create({
      data: { email, passwordHash },
    });

    console.log('User signed up successfully!');
    revalidatePath('/');
    return "User signed up successfully! Please sign in.";
  } catch (e) {
    console.error(e);
  }
}