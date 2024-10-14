import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Services } from './services.service'
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateServiceDTO } from 'src/dto/update-service.dto';

export interface PostModel {
    type_service: string
}

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

    @Put('update/:id')
    async update(@Param('id') id: string, @Body() updateServiceDTO: UpdateServiceDTO) {
        return await this.services.update(+id, updateServiceDTO);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string){
        return this.services.delete(+id)
    }
}