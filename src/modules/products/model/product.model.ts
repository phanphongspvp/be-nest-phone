// product.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Category } from '../../categories/model/categories.model';

@Schema()
export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    guarantee: number;
    
    @Prop({ required: true })
    status: boolean;

    @Prop({ type: [String], required: true })
    basicInfo: string[];

    @Prop({ type: [String]})
    images: string[];

    @Prop({ type: Types.ObjectId, ref: 'Category' })
    category: Category;
    
}

export const ProductModel = SchemaFactory.createForClass(Product);
