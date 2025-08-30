/*
  Warnings:

  - Added the required column `userId` to the `LaundryScheduler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."LaundryScheduler" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "LaundryScheduler_userId_idx" ON "public"."LaundryScheduler"("userId");

-- AddForeignKey
ALTER TABLE "public"."LaundryScheduler" ADD CONSTRAINT "LaundryScheduler_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
