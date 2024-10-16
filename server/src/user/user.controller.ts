import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './user.service'
import { PrismaService } from '../database/prisma.service';

@Controller('user')
export class UserController {
    constructor(private user: User, private prisma: PrismaService) { }

    @Get('get')
    async getAllUser() {
        return this.user.getUser()
    }
}