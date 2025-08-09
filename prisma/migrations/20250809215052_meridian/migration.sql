/*
  Warnings:

  - The values [Sarturday] on the enum `Day` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `endWindowMeridian` on the `windows` table. All the data in the column will be lost.
  - You are about to drop the column `startWindowMeridian` on the `windows` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Day_new" AS ENUM ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
ALTER TABLE "windows" ALTER COLUMN "startWindowDay" TYPE "Day_new" USING ("startWindowDay"::text::"Day_new");
ALTER TABLE "windows" ALTER COLUMN "endWindowDay" TYPE "Day_new" USING ("endWindowDay"::text::"Day_new");
ALTER TYPE "Day" RENAME TO "Day_old";
ALTER TYPE "Day_new" RENAME TO "Day";
DROP TYPE "Day_old";
COMMIT;

-- AlterTable
ALTER TABLE "windows" DROP COLUMN "endWindowMeridian",
DROP COLUMN "startWindowMeridian";

-- DropEnum
DROP TYPE "Meridian";
