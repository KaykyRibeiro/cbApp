import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './database/prisma.service';
import { CreateServicesDto } from './dto/create-services.dto';

@Controller()
export class AppController {

  constructor(private prisma: PrismaService) { }

  @Get()
  async getServices() {

    const services = await this.prisma.services.findMany()
    const typeService = await this.prisma.typeService.findMany()
    const servicesDetails = await this.prisma.servicesDetail.findMany()

    return {
      services: services,
      typeService: typeService,
      servicesDetails: servicesDetails
    };
  }

  @Post('services')
  create(@Body() createServicesDto: CreateServicesDto) {

    const service = {
      valor: createServicesDto.valor,
      dataInicio: createServicesDto.dataInicio,
      dataFinal: createServicesDto.dataFinal
    }
    return service

  }
}