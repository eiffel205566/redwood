-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "expenseId" INTEGER;

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("expenseId") REFERENCES "Expense"("id") ON DELETE SET NULL ON UPDATE CASCADE;
