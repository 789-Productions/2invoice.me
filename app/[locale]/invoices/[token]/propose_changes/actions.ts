"use server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function sendConfirmChangesAction(differences: any[], invoiceId: number) {
  const session = await auth();
  if (!session?.userId) return { ok: false, error: "Unauthorized" };

  try {
    // then create records in invoicechanges for each difference so that the provider can review them and look back on them through history
    for (const diff of differences) {
      let oldItemId: number = 0;
      let newItemId: number = 0;
      if (diff.oldItem && diff.newItem) {
        // Create new item (that is an updated version of old item) and link both to change record
        const { description, quantity, unitCents } = diff.newItem;
        const newItem = await prisma.invoiceitem.create({
          data: { description, quantity, unitCents, invoiceId: null }
        });
        newItemId = newItem.id;
        oldItemId = diff.oldItem.id;
      } else if (diff.newItem) {
        const { description, quantity, unitCents } = diff.newItem;
        // Create new item
        oldItemId = 0; // dummy old item
        const newItem = await prisma.invoiceitem.create({
          data: { description, quantity, unitCents, invoiceId: null}
        });
        newItemId = newItem.id;
      } else if (diff.oldItem) {
        // delete old item (we don't actually delete it, just link to it and let provider decide what to do)
        newItemId = 0; // dummy new item
        oldItemId = diff.oldItem.id;
      }
      if (oldItemId === 0 && newItemId === 0) {
        throw new Error("Both oldItemId and newItemId are zero");
      }
      else {
        const invoiceChangesRecord = await prisma.invoicehistory.create({
          data: {
                invoiceId: invoiceId,
                action: "CHANGED_BY_CLIENT",
            },
        });
        const invoiceHistoryId = invoiceChangesRecord.id;

        // create the change record linking to the invoice history record
        await prisma.invoicechanges.create({
            data: {
                invoiceHistoryId: invoiceHistoryId,
                oldItemId: oldItemId,
                newItemId: newItemId,
            }
        });
      }
    }
    // let the provider know that the invoice needs approval
    await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: "NEEDS_APPROVAL" }
    });
    revalidatePath(`/dashboard`);
    return { ok: true };
  } catch (error) {
    console.log("Failed to confirm changes:", error);
    return { ok: false, error: "Failed to confirm changes" };
  }
}