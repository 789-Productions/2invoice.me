"use server";

import { prisma } from "@/lib/db";
import crypto from "crypto";
import { auth } from "@/lib/auth";

export async function createInvoiceAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.userId) return { ok: false, error: "Unauthorized" };

  const clientId = Number(formData.get("clientId"));
  const number = String(formData.get("number"));
  const currency = String(formData.get("currency") || "USD");
  const issueDate = new Date(String(formData.get("issueDate")));
  const dueDate = new Date(String(formData.get("dueDate")));
  const items = JSON.parse(String(formData.get("items") ?? "[]")) as Array<{
    description: string; quantity: number; unitCents: number;
  }>;

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
      items: { createMany: { data: items } }
    }
  });

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
    return { ok: true };
  } catch (error) {
    console.log("Failed to delete invoice:", error);
    return { ok: false, error: "Failed to delete invoice" };
  }
}