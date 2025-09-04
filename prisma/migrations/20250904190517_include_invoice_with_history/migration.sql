/*
  Warnings:

  - You are about to drop the column `invoiceid` on the `invoicehistory` table. All the data in the column will be lost.
  - Added the required column `invoiceId` to the `invoicehistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `invoicehistory` DROP COLUMN `invoiceid`,
    ADD COLUMN `invoiceId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `invoicehistory` ADD CONSTRAINT `InvoiceHistory_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `invoice`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
