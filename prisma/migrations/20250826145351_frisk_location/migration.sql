/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_id_userId_key" ON "public"."Location"("id", "userId");
