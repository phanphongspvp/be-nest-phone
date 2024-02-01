// src/headers/header.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { HeaderService } from './header.service';
import { HeaderDto } from './dto/header.dto';
import { Header } from './model/header.model';

@Controller('headers')
export class HeaderController {
  constructor(private readonly headerService: HeaderService) {}

  @Post()
  create(@Body() headerDto: HeaderDto): Promise<Header> {
    return this.headerService.create(headerDto);
  }

  @Get()
  findAll(): Promise<Header[]> {
    return this.headerService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Header> {
    return this.headerService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() headerDto: HeaderDto): Promise<Header> {
    return this.headerService.update(id, headerDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Header> {
    return this.headerService.delete(id);
  }
}
