-- CreateEnum
CREATE TYPE "Day" AS ENUM ('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sarturday');

-- CreateEnum
CREATE TYPE "Meridian" AS ENUM ('AM', 'PM');

-- CreateTable
CREATE TABLE "windows" (
    "id" SERIAL NOT NULL,
    "startWindowDay" "Day" NOT NULL,
    "startWindowHour" INTEGER NOT NULL,
    "startWindowMin" INTEGER NOT NULL,
    "startWindowMeridian" "Meridian" NOT NULL,
    "endWindowDay" "Day" NOT NULL,
    "endWindowHour" INTEGER NOT NULL,
    "endWindowMin" INTEGER NOT NULL,
    "endWindowMeridian" "Meridian" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "windows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "windows_userId_idx" ON "windows"("userId");

-- AddForeignKey
ALTER TABLE "windows" ADD CONSTRAINT "windows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
