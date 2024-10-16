import { Module } from '@nestjs/common';
import { User} from './user.service';  // Importa o serviço
import { UserController } from './user.controller';  // Importa o controller
import { PrismaService } from '../database/prisma.service';  // Importa o PrismaService para lidar com o banco de dados

@Module({
  controllers: [UserController],  // Registra o controller para o módulo
  providers: [User, PrismaService],  // Registra o serviço e o PrismaService como providers
})
export class UserModule {}