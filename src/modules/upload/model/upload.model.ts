import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Upload extends Document {
    @Prop({ required: true })
    image: string[];

}

export const UploadModel = SchemaFactory.createForClass(Upload);
