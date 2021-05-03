/*
  Warnings:

  - You are about to drop the column `expenseId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_expenseId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "expenseId";

-- CreateTable
CREATE TABLE "_ExpenseToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExpenseToTag_AB_unique" ON "_ExpenseToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ExpenseToTag_B_index" ON "_ExpenseToTag"("B");

-- AddForeignKey
ALTER TABLE "_ExpenseToTag" ADD FOREIGN KEY ("A") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExpenseToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
