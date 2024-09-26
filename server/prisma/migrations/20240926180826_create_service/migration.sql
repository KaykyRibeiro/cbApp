/*
  Warnings:

  - Changed the type of `price_service` on the `service` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "service" DROP COLUMN "price_service",
ADD COLUMN     "price_service" DECIMAL(65,30) NOT NULL;
