-- CreateTable
CREATE TABLE `invoicechanges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoiceHistoryId` INTEGER NOT NULL,
    `oldItemId` INTEGER NOT NULL,
    `newItemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invoicechanges` ADD CONSTRAINT `invoicechanges_oldItemId_fkey` FOREIGN KEY (`oldItemId`) REFERENCES `invoiceitem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoicechanges` ADD CONSTRAINT `invoicechanges_newItemId_fkey` FOREIGN KEY (`newItemId`) REFERENCES `invoiceitem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoicechanges` ADD CONSTRAINT `invoicechanges_invoiceHistoryId_fkey` FOREIGN KEY (`invoiceHistoryId`) REFERENCES `invoicehistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
