import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AccountType } from 'src/enums/ACCOUNT_TYPE';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

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
    validate: {
      validator: function(array: string[]) {
        const uniqueSet = new Set(array)
        return uniqueSet.size == array.length
      },
      message: 'Bookmarks arry must contain unique values'
    }
  })
  bookmarks: string[]
}

export const UserSchema = SchemaFactory.createForClass(User);
