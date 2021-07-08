-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "tagName" TEXT NOT NULL,
    "expenseTypeId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tag" ADD FOREIGN KEY ("expenseTypeId") REFERENCES "ExpenseType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
