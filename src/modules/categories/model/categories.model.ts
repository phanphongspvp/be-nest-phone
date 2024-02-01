import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/modules/products/model/product.model';

@Schema()
export class Category extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: Product[];

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CategoryModel = SchemaFactory.createForClass(Category);
