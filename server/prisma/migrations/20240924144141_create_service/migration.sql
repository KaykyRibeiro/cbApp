/*
  Warnings:

  - You are about to drop the `Services` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Services";

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "image" TEXT NOT NULL,
    "andamento" BOOLEAN NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
