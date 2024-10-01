/*
  Warnings:

  - You are about to drop the column `ClienteNome` on the `service` table. All the data in the column will be lost.
  - Added the required column `clienteNome` to the `service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service" DROP COLUMN "ClienteNome",
ADD COLUMN     "clienteNome" TEXT NOT NULL,
ADD COLUMN     "descricao" TEXT NOT NULL;
