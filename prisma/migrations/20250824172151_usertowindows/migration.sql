/*
  Warnings:

  - Added the required column `userId` to the `windows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."windows" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "windows_userId_laundryId_idx" ON "public"."windows"("userId", "laundryId");

-- AddForeignKey
ALTER TABLE "public"."windows" ADD CONSTRAINT "windows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
