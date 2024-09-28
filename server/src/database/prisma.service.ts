import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  updateService(arg0: { where: { id: number; }; }) {
    throw new Error('Method not implemented.');
  }
  update(arg0: { where: { id: number; }; }) {
    throw new Error('Method not implemented.');
  }
  post: any;
  async onModuleInit() {
    await this.$connect();
  }
}