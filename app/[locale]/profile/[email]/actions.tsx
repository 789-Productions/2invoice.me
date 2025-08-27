"use server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import fs from "fs";
import { revalidatePath } from "next/cache";

export async function editProfileAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.userId) return { ok: false, error: "Unauthorized" };

  const name = String(formData.get("name"));
  const updateObj = { image: null, name: null } as any;
  if (name) {
    updateObj.name = name;
  } else {
    delete updateObj.name;
  }

  const emptyImage =
    !formData.get("imageUpload") ||
    (formData.get("imageUpload") as File).size <= 0;
  if (emptyImage) {
    delete updateObj.image;
  } else {
    const imageFile = formData.get("imageUpload") as File;
    const imagePath = await processAndSaveImage(
      imageFile,
      session.userId as string
    );
    updateObj.image = imagePath;
  }

  await prisma.user.update({
    where: { id: session.userId as string },
    data: updateObj,
  });

  const path = formData.get("currentPath") as string;
  revalidatePath(path);
  return { ok: true, message: "Profile updated successfully" };
}

const processAndSaveImage = async (image: File, userId: string) => {
  const imageBuffer = Buffer.from(await image.arrayBuffer());
  const imagePath = `./public/uploads/${userId}_avatar.${
    image.type.split("/")[1]
  }`;
  if (!fs.existsSync("./public/uploads")) {
    fs.mkdirSync("./public/uploads", { recursive: true });
  }
  fs.writeFileSync(imagePath, imageBuffer);
  return imagePath;
};
