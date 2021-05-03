/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[tagName,expenseTypeId]` on the table `Tag`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tag.tagName_expenseTypeId_unique" ON "Tag"("tagName", "expenseTypeId");
