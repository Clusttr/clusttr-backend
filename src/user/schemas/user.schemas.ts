import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BankAccount } from 'src/bankAccount/schemas/bankAccount.schema';
import { AccountType } from 'src/enums/ACCOUNT_TYPE';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  pin: string;

  @Prop()
  profileImage: string;

  @Prop()
  accountType: AccountType;

  @Prop()
  publicKey: string;

  @Prop({
    type: () => [String],
    validate: {
      validator: function (array: string[]) {
        const uniqueSet = new Set(array);
        return uniqueSet.size === array.length;
      },
      message: 'Bookmarks array must contain unique values',
    },
  })
  bookmarks: string[];

  @Prop({
    type: () => [String],
  })
  benefactors: string[];

  @Prop({
    type: () => [BankAccount],
    _id: false,
  })
  bankAccounts: BankAccount[];

  @Prop({
    type: Types.ObjectId,
  })
  kyc: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
