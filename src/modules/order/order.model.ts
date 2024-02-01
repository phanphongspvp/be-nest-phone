// src/order/order.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/modules/users/model/user.model';

@Schema()
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({
    type: [
      {
        id: String,
        name: String,
        price: Number,
        count: Number,
      },
    ],
    default: [],
  })
  items: {
    id: string;
    name: string;
    price: number;
    count: number;
  }[];

  @Prop({ default: '' })
  shippingAddress: string;

  @Prop({ default: '' })
  phoneNumber: string;

  @Prop({ default: false })
  status: boolean;

  @Prop({ default: 0 })
  totalItems: number;

  @Prop({ default: 0 })
  totalPrice: number;

  @Prop({ default: '' })
  notes: string;
  
  @Prop({ default: '' })
  transferType: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
