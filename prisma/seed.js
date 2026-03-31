import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {

  const password = await bcrypt.hash('admin', 10)

  const usuarioExistente = await prisma.usuarios.findFirst({
    where: { nombre: 'admin' }
  })

  if (!usuarioExistente) {
    await prisma.usuarios.create({
      data: {
        nombre: 'admin',
        email: 'admin@admin.com',
        password: password,
        rol: 'ADMIN'
      }
    })
  }

  const clienteExistente = await prisma.clientes.findFirst({
    where: { nombre: 'Consumidor Final' }
  })

  if (!clienteExistente) {
    await prisma.clientes.create({
      data: {
        nombre: 'Consumidor Final'
      }
    })
  }

  console.log('Seed ejecutado correctamente')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })