/*
  Warnings:

  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services_detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `type_service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "services_detail" DROP CONSTRAINT "services_detail_id_services_fkey";

-- DropForeignKey
ALTER TABLE "services_detail" DROP CONSTRAINT "services_detail_id_type_service_fkey";

-- DropTable
DROP TABLE "services";

-- DropTable
DROP TABLE "services_detail";

-- DropTable
DROP TABLE "type_service";

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Services_email_key" ON "Services"("email");
