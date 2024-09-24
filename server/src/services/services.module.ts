import { Module } from '@nestjs/common';
import { Services} from './services.service';  // Importa o serviço
import { ServicesController } from './services.controller';  // Importa o controller
import { PrismaService } from '../database/prisma.service';  // Importa o PrismaService para lidar com o banco de dados

@Module({
  controllers: [ServicesController],  // Registra o controller para o módulo
  providers: [Services, PrismaService],  // Registra o serviço e o PrismaService como providers
})
export class ServicesModule {}