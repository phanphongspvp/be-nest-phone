// src/cart/cart.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cart extends Document {
  @Prop({ required: true })
  user: string;

  @Prop({
    type: [{ id: String, name: String, price: Number, count: Number }],
    default: [],
  })
  items: { id: string; name: string; price: number; count: number }[];

  @Prop({ default: '' })
  img: string;

  @Prop({ default: 0 })
  totalItems: number;

  @Prop({ default: 0 })
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
