/*
  Warnings:

  - You are about to drop the `AccessProfilePermission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AccessProfilePermission" DROP CONSTRAINT "AccessProfilePermission_access_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "AccessProfilePermission" DROP CONSTRAINT "AccessProfilePermission_permission_id_fkey";

-- DropTable
DROP TABLE "AccessProfilePermission";

-- DropTable
DROP TABLE "tb_permissions";

-- CreateTable
CREATE TABLE "tb_users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "access_profile_id" TEXT NOT NULL,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tb_users" ADD CONSTRAINT "tb_users_access_profile_id_fkey" FOREIGN KEY ("access_profile_id") REFERENCES "tb_access_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
