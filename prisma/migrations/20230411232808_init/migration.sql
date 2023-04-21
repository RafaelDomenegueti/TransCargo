/*
  Warnings:

  - You are about to drop the column `city` on the `tb_loads` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `tb_loads` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `tb_loads` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `tb_loads` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `tb_loads` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `tb_loads` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `tb_loads` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `tb_pitstops` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `tb_pitstops` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `tb_pitstops` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `tb_pitstops` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `tb_pitstops` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `tb_pitstops` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `tb_pitstops` table. All the data in the column will be lost.
  - You are about to drop the column `load_id` on the `tb_routes` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `tb_status_routes` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `tb_status_routes` table. All the data in the column will be lost.
  - You are about to drop the column `neighborhood` on the `tb_status_routes` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `tb_status_routes` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `tb_status_routes` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `tb_status_routes` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `tb_status_routes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[destination_id]` on the table `tb_loads` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[destination_id]` on the table `tb_routes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `destination_id` to the `tb_loads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin_id` to the `tb_loads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `tb_pitstops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination_id` to the `tb_routes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `origin_id` to the `tb_routes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_id` to the `tb_status_routes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_routes" DROP CONSTRAINT "tb_routes_load_id_fkey";

-- AlterTable
ALTER TABLE "tb_loads" DROP COLUMN "city",
DROP COLUMN "details",
DROP COLUMN "neighborhood",
DROP COLUMN "number",
DROP COLUMN "state",
DROP COLUMN "street",
DROP COLUMN "zipcode",
ADD COLUMN     "destination_id" TEXT NOT NULL,
ADD COLUMN     "origin_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tb_pitstops" DROP COLUMN "city",
DROP COLUMN "details",
DROP COLUMN "neighborhood",
DROP COLUMN "number",
DROP COLUMN "state",
DROP COLUMN "street",
DROP COLUMN "zipcode",
ADD COLUMN     "location_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tb_routes" DROP COLUMN "load_id",
ADD COLUMN     "destination_id" TEXT NOT NULL,
ADD COLUMN     "origin_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tb_status_routes" DROP COLUMN "city",
DROP COLUMN "details",
DROP COLUMN "neighborhood",
DROP COLUMN "number",
DROP COLUMN "state",
DROP COLUMN "street",
DROP COLUMN "zipcode",
ADD COLUMN     "location_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "tb_location" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "details" TEXT,

    CONSTRAINT "tb_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoadsRoutes" (
    "load_id" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoadsRoutes_pkey" PRIMARY KEY ("load_id","route_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_loads_destination_id_key" ON "tb_loads"("destination_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_routes_destination_id_key" ON "tb_routes"("destination_id");

-- AddForeignKey
ALTER TABLE "tb_loads" ADD CONSTRAINT "tb_loads_origin_id_fkey" FOREIGN KEY ("origin_id") REFERENCES "tb_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_loads" ADD CONSTRAINT "tb_loads_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "tb_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadsRoutes" ADD CONSTRAINT "LoadsRoutes_load_id_fkey" FOREIGN KEY ("load_id") REFERENCES "tb_loads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadsRoutes" ADD CONSTRAINT "LoadsRoutes_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "tb_routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_routes" ADD CONSTRAINT "tb_routes_origin_id_fkey" FOREIGN KEY ("origin_id") REFERENCES "tb_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_routes" ADD CONSTRAINT "tb_routes_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "tb_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_pitstops" ADD CONSTRAINT "tb_pitstops_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "tb_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_status_routes" ADD CONSTRAINT "tb_status_routes_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "tb_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
