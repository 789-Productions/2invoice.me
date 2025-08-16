"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

interface InvoiceItem {
  description: string;
  quantity: number;
  unitCents: number;
}

export async function editInvoiceAction(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.userId) return { ok: false, error: "Unauthorized" };

  const id = formData.get("id");
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
  const totalCents = items.reduce((sum, it) => sum + it.quantity * it.unitCents, 0);


  await prisma.invoiceItem.deleteMany({
    where: { invoiceId: Number(id) },
  });
  await prisma.invoice.update({
    where: { id: Number(id) },
    data: {
      clientId,
      number,
      currency,
      issueDate,
      dueDate,
      totalCents,
      items: {
        createMany: { data: items }
      },
    }
  });
  revalidatePath(`/invoices/${id}/edit`);
  return { ok: true, message: "Invoice updated successfully" };
}
