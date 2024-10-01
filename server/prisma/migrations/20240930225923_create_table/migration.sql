/*
  Warnings:

  - You are about to drop the column `name_car` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `price_service` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `type_service` on the `service` table. All the data in the column will be lost.
  - Added the required column `ClienteNome` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoServico` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `veiculoAno` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `veiculoCor` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `veiculoModelo` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service" DROP COLUMN "name_car",
DROP COLUMN "price_service",
DROP COLUMN "type_service",
ADD COLUMN     "ClienteNome" TEXT NOT NULL,
ADD COLUMN     "precoServico" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL,
ADD COLUMN     "veiculoAno" TEXT NOT NULL,
ADD COLUMN     "veiculoCor" TEXT NOT NULL,
ADD COLUMN     "veiculoModelo" TEXT NOT NULL;
