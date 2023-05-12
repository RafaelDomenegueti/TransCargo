/*
  Warnings:

  - Added the required column `customer_id` to the `tb_loads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_loads" ADD COLUMN     "customer_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tb_status_routes" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "tb_loads" ADD CONSTRAINT "tb_loads_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
