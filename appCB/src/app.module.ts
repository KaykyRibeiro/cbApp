import { Module } from "@nestjs/common";
import { UserModule } from './services/user.module';
import { PrismaService } from './services/prisma.service';

@Module({
    imports: [UserModule],
    providers: [PrismaService],
})

export class AppModule {}