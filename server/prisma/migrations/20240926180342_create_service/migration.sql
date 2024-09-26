/*
  Warnings:

  - You are about to drop the column `typeID` on the `service` table. All the data in the column will be lost.
  - You are about to drop the `TypeService` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price_service` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_service` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_typeID_fkey";

-- AlterTable
ALTER TABLE "service" DROP COLUMN "typeID",
ADD COLUMN     "price_service" TEXT NOT NULL,
ADD COLUMN     "type_service" TEXT NOT NULL;

-- DropTable
DROP TABLE "TypeService";
