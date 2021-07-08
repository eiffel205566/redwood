/*
  Warnings:

  - Added the required column `expenseTypeId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "expenseTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD FOREIGN KEY ("expenseTypeId") REFERENCES "ExpenseType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
