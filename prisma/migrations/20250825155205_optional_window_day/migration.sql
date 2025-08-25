-- AlterTable
ALTER TABLE "public"."windows" ALTER COLUMN "startWindowDay" DROP NOT NULL,
ALTER COLUMN "endWindowDay" DROP NOT NULL,
ALTER COLUMN "startDayIndex" DROP NOT NULL;
