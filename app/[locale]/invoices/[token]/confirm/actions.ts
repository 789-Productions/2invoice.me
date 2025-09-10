"use server";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
 import { redirect } from "next/navigation";

export async function confirmInvoiceAction(invoiceId: number) {
  const session = await auth();
  if (!session?.userId) return { ok: false, error: "Unauthorized" };

  try {
    // create a record in invoicehistory so that we have a reference for this set of changes and can look back on them
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
    console.log("Invoice confirmed successfully");
  } catch (error) {
    console.log("Failed to confirm invoice:", error);
    return { ok: false, error: "Failed to confirm invoice" };
  }
  revalidatePath(`/dashboard`);
  redirect(`/dashboard`);
}

export async function cancelInvoiceAction(invoiceId: number) {
    const session = await auth();
    if (!session?.userId) return { ok: false, error: "Unauthorized" };
    try {
        // create a record in invoicehistory so that we have a reference for this set of changes and can look back on them
        await prisma.invoicehistory.create({
            data: {
                invoiceId: invoiceId,
                action: "CANCEL",
            },
        });
        // let the provider know that the invoice has been cancelled
        await prisma.invoice.update({
            where: { id: invoiceId },
            data: { status: "CANCELLED" }
        });
        console.log("Invoice cancelled successfully");
    }
    catch (error) {
        console.log("Failed to cancel invoice:", error);
        return { ok: false, error: "Failed to cancel invoice" };
    }
    revalidatePath(`/dashboard`);
    redirect(`/dashboard`);
}