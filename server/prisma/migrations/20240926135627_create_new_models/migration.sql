/*
  Warnings:

  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Service";

-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "name_car" TEXT NOT NULL,
    "typeID" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "in_progress" BOOLEAN NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeService" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "TypeService_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TypeService_price_key" ON "TypeService"("price");

-- AddForeignKey
ALTER TABLE "service" ADD CONSTRAINT "service_typeID_fkey" FOREIGN KEY ("typeID") REFERENCES "TypeService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
