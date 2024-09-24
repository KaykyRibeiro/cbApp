import { Controller, Get } from '@nestjs/common';
import {Services} from './services.service'

@Controller('services')
export class ServicesController {
    constructor(private services: Services) {}

    @Get()
    async getAllServices() {
        return this.services.getServices()
    }
}