"use server";
import { prisma } from "@/lib/db";
import crypto from "crypto";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { InvoiceStatus } from "@/lib/generated/prisma";

// Define the item interface
interface InvoiceItem {
  description: string;
  quantity: number;
  unitCents: number;
}

export async function createInvoiceAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.userId) return { ok: false, error: "Unauthorized" };

  const clientId = Number(formData.get("clientId"));
  const number = String(formData.get("number"));
  const currency = String(formData.get("currency") || "USD");
  const issueDate = new Date(String(formData.get("issueDate")));
  const dueDate = new Date(String(formData.get("dueDate")));
  const items: InvoiceItem[] = [];
  for (const [key, value] of formData.entries()) {
    console.log(`Form data: ${key} = ${value}`);
    if (key.startsWith("item-")) {
      const index = Number(key.split("-")[1]);
      const field = key.split("-")[2];
      if (!items[index]) items[index] = { description: "", quantity: 0, unitCents: 0 }; // if doesn't exist create new in items list
      if (field === "description") {
        items[index].description = String(value);
      } else if (field === "quantity") {
        items[index].quantity = Number(value);
      } else if (field === "unitCents") {
        items[index].unitCents = Number(value);
      }
  }
}

  const token = crypto.randomBytes(24).toString("base64url");
  const totalCents = items.reduce((sum, it) => sum + it.quantity * it.unitCents, 0);

  await prisma.invoice.create({
    data: {
      userId: session.userId as string,
      clientId,
      number,
      token,
      currency,
      issueDate,
      dueDate,
      totalCents,
      status: formData.get("status") as InvoiceStatus || "DRAFT",
      invoiceitem: { createMany: { data: items } }
    }
  });
  revalidatePath(`/dashboard`);
  return { ok: true };
}

export async function deleteInvoiceAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.userId) return { ok: false, error: "Unauthorized" };

  const id = Number(formData.get("id"));
  console.log("Deleting invoice with ID:", id);
  if (!id) return { ok: false, error: "Invalid invoice ID" };

  try {
    await prisma.invoice.delete({
      where: { id }
    });
    revalidatePath(`/dashboard`);
    return { ok: true };
  } catch (error) {
    console.log("Failed to delete invoice:", error);
    return { ok: false, error: "Failed to delete invoice" };
  }
}