import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { UploadAsset } from '../schema/upload_asset.schema';
import { PropertyType } from './upload_asset_req.dto';

export class UploadAssetDtoRes {
  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'string',
    example: 'asset_id',
    description: 'Id',
  })
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'string',
    example: 'some_random_secret_key',
    description: 'Private key',
  })
  readonly mintKey: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'name',
    example: 'Chatam house',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    name: 'symbol',
    example: 'Chatam house',
  })
  readonly symbol: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80, { message: 'Description can not be more than 80 characters' })
  @ApiProperty({
    name: 'description',
    example:
      'Some length description about asset with a maximum of 80 characters',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    name: 'bedrooms',
    example: '3.5',
  })
  bedrooms: number;

  @IsNumber()
  @ApiProperty({
    name: 'bathrooms',
    example: '2.5',
  })
  bathrooms: number;

  @IsString()
  @ApiProperty({
    name: 'address',
    example: '3.5',
  })
  address: string;

  @IsNumber()
  @ApiProperty({
    name: 'land area',
    example: '500',
  })
  landArea: string;

  @IsArray()
  @ApiProperty({
    name: 'latlng',
    example: '[12.3267, 6.2356]',
  })
  latlng: number[];

  @IsNumber()
  @ApiProperty({
    name: 'propertyType',
    example: PropertyType,
  })
  propertyType: PropertyType;

  @IsNumber()
  @ApiProperty({
    name: 'year',
    example: 2025,
  })
  year: number;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    name: 'displayImage',
    example: 'https://domain.com/random_pubkey_on',
  })
  coverImage?: string;
}

export function createUploadAssetRes(
  asset: UploadAsset & { _id: Types.ObjectId },
): UploadAssetDtoRes {
  return {
    id: asset._id.toString(),
    mintKey: asset.mintKey,
    name: asset.name,
    symbol: asset.symbol,
    description: asset.description,
    bedrooms: asset.bedrooms,
    bathrooms: asset.bathrooms,
    address: asset.address,
    landArea: asset.landArea,
    latlng: asset.latlng,
    propertyType: asset.propertyType,
    year: asset.year,
    coverImage: asset.coverImage,
  };
}
