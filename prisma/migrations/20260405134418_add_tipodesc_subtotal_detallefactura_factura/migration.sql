/*
  Warnings:

  - Added the required column `subtotal` to the `facturas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "detallefacturas" ADD COLUMN     "tipodesc" VARCHAR(20);

-- AlterTable
ALTER TABLE "facturas" ADD COLUMN     "subtotal" DECIMAL(10,2) NOT NULL;
