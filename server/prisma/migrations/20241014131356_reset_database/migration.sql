-- CreateTable
CREATE TABLE "service" (
    "id" SERIAL NOT NULL,
    "clienteNome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "veiculoModelo" TEXT NOT NULL,
    "veiculoAno" TEXT NOT NULL,
    "veiculoCor" TEXT NOT NULL,
    "tipoServico" TEXT NOT NULL,
    "precoServico" DECIMAL(65,30) NOT NULL,
    "descricao" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "end" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "in_progress" BOOLEAN NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);
