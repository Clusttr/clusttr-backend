import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Bank {
  @Prop()
  name: string;

  @Prop()
  code: string;
}

export const BankSchema = SchemaFactory.createForClass(Bank);
