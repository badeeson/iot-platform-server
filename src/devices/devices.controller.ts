import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

@Controller('devices')
export class DevicesController {
  @Get()
  findAll(): string {
    return 'This will return all devices';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This will return device with ID ${id}`;
  }

  @Post()
  create(@Body() createDeviceDto: any): string {
    return `This will create a new device with data: ${JSON.stringify(createDeviceDto)}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeviceDto: any): string {
    return `This will update device with ID ${id} with data: ${JSON.stringify(updateDeviceDto)}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This will remove device with ID ${id}`;
  }
}
