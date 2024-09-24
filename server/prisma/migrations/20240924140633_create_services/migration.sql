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
    "id" TEXT NOT NULL,
    "name_car" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_init" TIMESTAMP(3) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);
