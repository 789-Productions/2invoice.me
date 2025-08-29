import { cache } from "react";
import { auth } from './auth';
import { prisma } from './db';

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

export const getInvoiceBySortInfo = cache(async (sortType: SortType, sortOrder: SortOrder, takeAmount: number) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const invoices = await prisma.invoice.findMany({
    where: { userId: session.userId },
    include: { client: true },
    orderBy: {
      [sortType]: sortOrder,
    },
    take: takeAmount,
  });
  return invoices;
});
