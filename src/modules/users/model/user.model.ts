// user.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
    Admin = 'admin',
    Customer = 'customer',
}

@Schema()
export class User extends Document {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    roles: UserRole;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    phone: number;

    @Prop({ required: true })
    address: string;
}

export const UserModel = SchemaFactory.createForClass(User);
