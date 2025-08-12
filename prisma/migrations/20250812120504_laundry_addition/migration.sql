/*
  Warnings:

  - You are about to drop the column `userId` on the `windows` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "windows" DROP CONSTRAINT "windows_userId_fkey";

-- DropIndex
DROP INDEX "windows_userId_idx";

-- AlterTable
ALTER TABLE "windows" DROP COLUMN "userId",
ADD COLUMN     "laundryId" INTEGER,
ADD COLUMN     "location" TEXT;

-- CreateTable
CREATE TABLE "Laundry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Laundry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Laundry_userId_key" ON "Laundry"("userId");

-- CreateIndex
CREATE INDEX "Laundry_userId_idx" ON "Laundry"("userId");

-- AddForeignKey
ALTER TABLE "windows" ADD CONSTRAINT "windows_laundryId_fkey" FOREIGN KEY ("laundryId") REFERENCES "Laundry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laundry" ADD CONSTRAINT "Laundry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
