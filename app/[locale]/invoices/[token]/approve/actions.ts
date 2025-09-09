"use server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { invoiceitem } from "@/lib/generated/prisma";
import { redirect } from "next/navigation";

export async function approveChangesActions(newItems: (invoiceitem | null)[], oldItems: (invoiceitem | null)[], invoiceId: number) {
  const session = await auth();
  if (!session?.userId) return { ok: false, error: "Unauthorized" };

  try {
    // link all the new items to the invoice and unlink all the old items from the invoice
    for (let index = 0; index < newItems.length; index++) {
      const newItem = newItems[index];
      const oldItem = oldItems[index];
      if (newItem) {
         await prisma.invoiceitem.update({
          where: { id: newItem.id },
          data: { invoiceId: invoiceId }
        });
      }
      if (oldItem) {
        await prisma.invoiceitem.update({
          where: { id: oldItem.id },
          data: { invoiceId: null }
        });
      }
    }
    //  create a record in invoicehistory so that we have a reference for this set of changes and can look back on them
    await prisma.invoicehistory.create({
      data: {
        invoiceId: invoiceId,
        action: "APPROVED",
    },
    });
    // let the provider know that the invoice has been approved and now can be in progress
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: "IN_PROGRESS" }
    });
    console.log("Changes approved successfully");
  } catch (error) {
    console.log("Failed to approve changes:", error);
    return { ok: false, error: "Failed to approve changes" };
  }
  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}