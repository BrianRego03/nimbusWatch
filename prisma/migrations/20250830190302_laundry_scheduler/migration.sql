-- CreateTable
CREATE TABLE "public"."LaundryScheduler" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "laundryId" INTEGER NOT NULL,
    "windowId" INTEGER NOT NULL,

    CONSTRAINT "LaundryScheduler_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LaundryScheduler_laundryId_key" ON "public"."LaundryScheduler"("laundryId");

-- CreateIndex
CREATE UNIQUE INDEX "LaundryScheduler_windowId_key" ON "public"."LaundryScheduler"("windowId");

-- AddForeignKey
ALTER TABLE "public"."LaundryScheduler" ADD CONSTRAINT "LaundryScheduler_laundryId_fkey" FOREIGN KEY ("laundryId") REFERENCES "public"."Laundry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LaundryScheduler" ADD CONSTRAINT "LaundryScheduler_windowId_fkey" FOREIGN KEY ("windowId") REFERENCES "public"."windows"("id") ON DELETE CASCADE ON UPDATE CASCADE;
