import { FooterDto } from './dto/footer.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Footer } from './model/footer.model';
import { Model } from 'mongoose';

@Injectable()
export class FooterService {
    constructor(@InjectModel(Footer.name) private footerModel: Model<Footer>) {}

    async findAll(): Promise<Footer[]> {
        return this.footerModel.find().exec();
    }

    async findById(id: string): Promise<Footer> {
        return this.footerModel.findById(id).exec();
    }

    async create(footerDto: FooterDto): Promise<Footer> {
        const createFooter = new this.footerModel(footerDto);
        return createFooter.save();
    }

    async update(id: string, footerDto: FooterDto): Promise<Footer> {
        return this.footerModel.findByIdAndUpdate(id, footerDto, { new: true }).exec();
    }

    async delete(id: string): Promise<Footer> {
        return this.footerModel.findByIdAndDelete(id).exec();
    }
}
