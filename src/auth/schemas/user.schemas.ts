import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop({})
  accountType: AccountType
}

enum AccountType {
    user = 0,
    developer,
    admin
}

export const UserSchema = SchemaFactory.createForClass(User);
