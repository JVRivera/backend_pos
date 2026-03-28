-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "articulos" (
    "id" SERIAL NOT NULL,
    "articulo" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(255),
    "existencia" INTEGER DEFAULT 0,
    "precioventa" DECIMAL(10,2) NOT NULL,
    "preciocosto" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "articulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "direccion" VARCHAR(200),
    "telefono" VARCHAR(20),
    "nit" VARCHAR(20),

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detallefacturas" (
    "id" SERIAL NOT NULL,
    "idfactura" INTEGER NOT NULL,
    "idarticulo" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 1,
    "precioventa" DECIMAL(10,2) NOT NULL,
    "preciocosto" DECIMAL(10,2) NOT NULL,
    "descuento" DECIMAL(10,2) DEFAULT 0,
    "total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "detallefacturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facturas" (
    "id" SERIAL NOT NULL,
    "idcliente" INTEGER NOT NULL,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "descuento" DECIMAL(10,2) DEFAULT 0,
    "total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'USER',

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_nit_key" ON "clientes"("nit");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "detallefacturas" ADD CONSTRAINT "fk_articulo" FOREIGN KEY ("idarticulo") REFERENCES "articulos"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "detallefacturas" ADD CONSTRAINT "fk_factura" FOREIGN KEY ("idfactura") REFERENCES "facturas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "fk_cliente" FOREIGN KEY ("idcliente") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
