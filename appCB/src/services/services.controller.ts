import { Controller, Post, Body } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServicesDto } from './dto/create-services.dto';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) {}

    @Post()
    create(@Body() createServicesDto: CreateServicesDto) {
        return this.servicesService.create(createServicesDto)
    }
}