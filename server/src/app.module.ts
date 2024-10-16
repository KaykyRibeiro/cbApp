import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './database/prisma.service';
import { ServicesModule } from './services/services.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ServicesModule, UserModule],
  controllers: [AppController],
  providers: [PrismaService]
})
export class AppModule {}
