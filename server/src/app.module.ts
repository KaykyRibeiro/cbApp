import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [AppController],
  providers: [PrismaService]
})
export class AppModule {}
