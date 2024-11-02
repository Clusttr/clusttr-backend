import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Bank } from 'src/bank/schema/bank.schema';

@Schema({
  timestamps: true,
})
export class BankAccount {
  @Prop({ ref: 'Bank', type: () => Types.ObjectId, required: true })
  bank: Types.ObjectId;

  @Prop()
  accountName: string;

  @Prop()
  accountNumber: string;
}
