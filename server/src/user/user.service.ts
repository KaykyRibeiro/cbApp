import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class User {
  
  constructor(private prisma: PrismaService) { }

  async getUser() {
    return this.prisma.user.findMany();
  }

}