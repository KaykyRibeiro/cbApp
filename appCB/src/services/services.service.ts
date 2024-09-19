import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateServicesDto } from './dto/create-services.dto';

@Injectable()
export class ServicesService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateServicesDto) {
        return this.prisma.services.create({
            data,
        });
    }
}
