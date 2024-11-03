import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Kyc {
  @Prop({ required: true })
  idNumber: string;

  @Prop({ required: true, unique: true })
  idType: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;
}

export const KycSchema = SchemaFactory.createForClass(Kyc);
KycSchema.index({ idNumber: 1, idType: 1, phone: 1 }, { unique: true });
