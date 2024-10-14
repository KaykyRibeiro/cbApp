import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateServiceDTO } from 'src/dto/update-service.dto';

@Injectable()
export class Services {
  updateService(arg0: { where: { id: number; }; data: Services; }): import("./services.controller").PostModel | PromiseLike<import("./services.controller").PostModel> {
    throw new Error('Method not implemented.');
  }
  constructor(private prisma: PrismaService) { }

  async getServices() {
    return this.prisma.service.findMany();
  }

  async create(services: Prisma.ServiceCreateInput) {
    return await this.prisma.service.create({ data: services });
  }

  async findOne(id: number) {
    const service = this.prisma.service.findFirst()

    if (!service) {
      throw new NotFoundException('Serviço não encontrado')
    }

    return service
  }

  async update(id: number, updateServiceDTO: UpdateServiceDTO): Promise<void> {
    const service = this.findOne(id)

    await this.prisma.service.update({
      where: { id },
      data: updateServiceDTO,
    })

    return
  }

  async delete(id: number) {
    const service = this.findOne(id)

    await this.prisma.service.delete({ where: { id } })
  }
}