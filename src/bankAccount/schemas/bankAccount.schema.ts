import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AccountType } from 'src/enums/ACCOUNT_TYPE';

@Schema({
  timestamps: true,
})
export class BankAccountSchema {
  @Prop()
  bank: string;

  @Prop()
  accountName: string;

  @Prop()
  accountNumber: string;
}
