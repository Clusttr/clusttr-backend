import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class UploadAsset {
  @Prop()
  developer: string;

  @Prop({ unique: [true, "Asset can't be created more than once"] })
  mintKey: string;

  @Prop()
  name: string;

  @Prop()
  symbol: string;

  @Prop()
  description: string;

  @Prop()
  bedrooms: number;

  @Prop()
  bathrooms: number;

  @Prop()
  address: string;

  @Prop()
  landArea: string;

  @Prop()
  latlng: number[];

  @Prop()
  propertyType: PropertyType;

  @Prop()
  year: number;

  @Prop()
  coverImage: string;

  @Prop({
    type: () => [String],
    validate: {
      validator: function (array: string[]) {
        const uniqueSet = new Set(array);
        return uniqueSet.size === array.length;
      },
      message: 'Images be unique values',
    },
  })
  extraImages: string[];
}

enum PropertyType {
  apartment,
  detatchedDuplex,
  semiDetachedDeplex,
  terracDuplex,
  maisonette,
}

export const UploadAssetSchema = SchemaFactory.createForClass(UploadAsset);
