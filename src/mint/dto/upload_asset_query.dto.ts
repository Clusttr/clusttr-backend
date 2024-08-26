import { IsOptional, IsString } from 'class-validator';

export class UploadAssetQueryDto {
  @IsOptional()
  @IsString()
  asset_key?: string;

  @IsOptional()
  @IsString()
  creator?: string;
}
