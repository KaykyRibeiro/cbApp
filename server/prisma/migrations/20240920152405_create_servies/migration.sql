-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "DataInicio" TIMESTAMP(3) NOT NULL,
    "DataFinal" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services_detail" (
    "id" TEXT NOT NULL,
    "id_services" TEXT NOT NULL,
    "id_type_service" TEXT NOT NULL,

    CONSTRAINT "services_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "type_service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "services_detail" ADD CONSTRAINT "services_detail_id_services_fkey" FOREIGN KEY ("id_services") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services_detail" ADD CONSTRAINT "services_detail_id_type_service_fkey" FOREIGN KEY ("id_type_service") REFERENCES "type_service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
