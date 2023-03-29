-- CreateEnum
CREATE TYPE "enum_loads_types" AS ENUM ('GRANEL', 'FRIGORIFICO', 'CARGA_VIVA', 'CONTEINERES', 'PERIGOSAS', 'SECAS', 'INDIVISIVEIS', 'FRAGEIS', 'VEICULOS', 'MINERIOS');

-- CreateTable
CREATE TABLE "tb_access_profile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tb_access_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_permissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tb_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessProfilePermission" (
    "access_profile_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,
    "enable_create" BOOLEAN NOT NULL,
    "enable_update" BOOLEAN NOT NULL,
    "enable_delete" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "AccessProfilePermission_pkey" PRIMARY KEY ("access_profile_id","permission_id")
);

-- CreateTable
CREATE TABLE "tb_trucks" (
    "id" TEXT NOT NULL,
    "mocel" TEXT NOT NULL,
    "license_plate" TEXT NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "qtd_axle" INTEGER NOT NULL,

    CONSTRAINT "tb_trucks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_loads" (
    "id" TEXT NOT NULL,
    "type_loads" "enum_loads_types" NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "details" TEXT,

    CONSTRAINT "tb_loads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_routes" (
    "id" TEXT NOT NULL,
    "truck_id" TEXT NOT NULL,
    "load_id" TEXT NOT NULL,
    "estimate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tb_routes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_pitstops" (
    "id" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "details" TEXT,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_pitstops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_status_routes" (
    "id" TEXT NOT NULL,
    "route_id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "details" TEXT,
    "time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_status_routes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccessProfilePermission" ADD CONSTRAINT "AccessProfilePermission_access_profile_id_fkey" FOREIGN KEY ("access_profile_id") REFERENCES "tb_access_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessProfilePermission" ADD CONSTRAINT "AccessProfilePermission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "tb_permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_routes" ADD CONSTRAINT "tb_routes_truck_id_fkey" FOREIGN KEY ("truck_id") REFERENCES "tb_trucks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_routes" ADD CONSTRAINT "tb_routes_load_id_fkey" FOREIGN KEY ("load_id") REFERENCES "tb_loads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_pitstops" ADD CONSTRAINT "tb_pitstops_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "tb_routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_status_routes" ADD CONSTRAINT "tb_status_routes_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "tb_routes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
