"use server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import fs from "fs";

export async function editProfileAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.userId) return { ok: false, error: "Unauthorized" };

  const email = String(formData.get("email"));
  const name = String(formData.get("name"));
  const userId = formData.get("userId");
  const image = formData.get("image") as File;
  const imageBuffer = await image.arrayBuffer();
  const imagePath = `./public/uploads/${userId}_avatar.${
    image.type.split("/")[1]
  }`;
  fs.writeFileSync(imagePath, Buffer.from(imageBuffer));

  await prisma.user.update({
    where: { id: session.userId as string },
    data: { email, name, image: imagePath },
  });
  return { ok: true };
}
