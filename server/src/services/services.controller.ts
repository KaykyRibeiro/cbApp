import { Body, Controller, Get, Post } from '@nestjs/common';
import { Services } from './services.service'
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Controller('services')
export class ServicesController {
    constructor(private services: Services, private prisma: PrismaService) { }

    @Get('get')
    async getAllServices() {
        return this.services.getServices()
    }

    @Post('post')
    async create(@Body() service: Prisma.ServiceCreateInput) {
        return this.services.create(service)
    }
}