import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Footer extends Document {
    @Prop({ required: true })
    companyName: string;

    @Prop({ required: true })
    socialMedia: string;

    @Prop({ required: true })
    yearRelease: number;
}

export const FooterSchema = SchemaFactory.createForClass(Footer);