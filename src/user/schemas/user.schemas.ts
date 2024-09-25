import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
    validate: {
      validator: function (array: string[]) {
        const uniqueSet = new Set(array);
        return uniqueSet.size === array.length;
      },
      message: 'Benefactors must contain unique values',
    },
  })
  benefactors: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
