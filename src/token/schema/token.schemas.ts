import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class RecentToken {
  @Prop()
  creator: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  token: string;
}

export const TokenSchema = SchemaFactory.createForClass(RecentToken);