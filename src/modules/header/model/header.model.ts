import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Header extends Document {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true })
  contactPhone: string;

  @Prop({ required: true })
  operatingHours: string;
}

export const HeaderSchema = SchemaFactory.createForClass(Header);
