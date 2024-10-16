-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "nomeUsuario" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
