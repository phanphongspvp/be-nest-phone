import { FooterService } from './footer.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Footer } from './model/footer.model';
import { FooterDto } from './dto/footer.dto';

@Controller('footer')
export class FooterController {
    constructor(private readonly footerService:FooterService) {}

    @Get()
    findAll(): Promise<Footer[]> {
        return this.footerService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<Footer> {
        return this.footerService.findById(id);
    }

    @Post()
    create(@Body() footerDto: FooterDto): Promise<Footer> {
        return this.footerService.create(footerDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() footerDto: FooterDto): Promise<Footer> {
        return this.footerService.update(id, footerDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Footer> {
        return this.footerService.delete(id);
    }
}
