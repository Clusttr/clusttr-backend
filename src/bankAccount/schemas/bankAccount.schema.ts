import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class BankAccount {
  @Prop()
  bank: string;

  @Prop()
  accountName: string;

  @Prop()
  accountNumber: string;
}
