/*
  Warnings:

  - You are about to drop the column `mocel` on the `tb_trucks` table. All the data in the column will be lost.
  - Added the required column `model` to the `tb_trucks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_trucks" DROP COLUMN "mocel",
ADD COLUMN     "model" TEXT NOT NULL;
