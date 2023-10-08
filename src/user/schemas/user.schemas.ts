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
}

export const UserSchema = SchemaFactory.createForClass(User);
