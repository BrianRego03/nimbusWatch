/*
  Warnings:

  - Added the required column `startDayIndex` to the `windows` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "windows" ADD COLUMN     "startDayIndex" INTEGER NOT NULL;
