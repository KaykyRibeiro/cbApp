import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class Services {
  constructor(private prisma: PrismaService) {}

  async getServices() {
    return this.prisma.service.findMany(); 
  }
}