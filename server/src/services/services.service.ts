import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class Services {
  constructor(private prisma: PrismaService) {}

  async getServices() {
    return this.prisma.service.findMany(); 
  }

  async create(services: Prisma.ServiceCreateInput) {
    return await this.prisma.service.create({ data: services });
  }
}