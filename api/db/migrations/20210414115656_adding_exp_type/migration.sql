-- CreateTable
CREATE TABLE "ExpenseType" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "newName" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseType.description_newName_user_unique" ON "ExpenseType"("description", "newName", "user");
