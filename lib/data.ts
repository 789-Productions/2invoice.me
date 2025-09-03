import { cache } from "react";
import { auth } from './auth';
import { prisma } from './db';
import { InvoiceStatus } from "./generated/prisma";

export const getClients = cache(async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }
  const clients = await prisma.client.findMany({
    where: { userId: session.userId },
  });
  return clients;
});

export const getRecentInvoices = cache (async () => {
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized");
    }
    const recentInvoices = await prisma.invoice.findMany({
    where: { userId: session.userId },
    include: { client: true },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
    return recentInvoices;
})

export const getUserById = cache(async (id: string) => {
  console.log(`--- DATABASE HIT for user ${id} ---`);
  const user = await prisma.user.findUnique({ where: { id } });
  return user;
});

export type SortType = "number" | "issueDate" | "dueDate" | "totalCents";
export type SortOrder = "asc" | "desc";

type InvoiceStatusSearch = InvoiceStatus | "ANY";

export const getInvoiceBySortInfo = cache(async (sortType: SortType, sortOrder: SortOrder, takeAmount: number, invoiceStatus: InvoiceStatusSearch, min_price: number | undefined, max_price: number | undefined) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  let prisma_search = {
    where: { userId: session.userId, status: invoiceStatus === "ANY" ? undefined : invoiceStatus, totalCents: { gte: min_price, lte: max_price } },
    include: { client: true },
    orderBy: {
      [sortType]: sortOrder,
    },
    take: takeAmount,
  };
  console.log("Prisma search query:", prisma_search);
  const invoices = await prisma.invoice.findMany(prisma_search);
  return invoices;
});
