"use server";

import { prisma } from "@/lib/db";
import crypto from "crypto";
import { auth } from "@/lib/auth";

export async function editInvoiceAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.userId) return { ok: false, error: "Unauthorized" };

  const id = formData.get("id");
  const clientId = Number(formData.get("clientId"));
  const number = String(formData.get("number"));
  const currency = String(formData.get("currency") || "USD");
  const issueDate = new Date(String(formData.get("issueDate")));
  const dueDate = new Date(String(formData.get("dueDate")));
  const items = JSON.parse(String(formData.get("items") ?? "[]")) as Array<{
    description: string; quantity: number; unitCents: number;
  }>;

  console.log("Items:", items);
  const totalCents = items.reduce((sum, it) => sum + it.quantity * it.unitCents, 0);

  await prisma.invoice.update({
    where: { id: Number(id) },
    data: {
      clientId,
      number,
      currency,
      issueDate,
      dueDate,
      totalCents,
    }
  });

  return { ok: true };
}
