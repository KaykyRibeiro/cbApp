import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './database/prisma.service';

@Controller()
export class AppController {

  constructor(private prisma: PrismaService) { }

  @Get()
  getHello() {
    return String(process.env.NODE_ENV);
  }
}

