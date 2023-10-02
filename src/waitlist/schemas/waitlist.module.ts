import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';

@Schema({
  timestamps: true,
})
export class Waitlist {
  @Prop({
    required: true,
    validate: {
      validator: (value: string) => true,
      message: (props) => `${props.value} is not a valid email address`,
    },
  })
  email: string;
}

export const WaitlistSchema = SchemaFactory.createForClass(Waitlist);
