import { IsNotEmpty, IsString } from 'class-validator';

export class ScalexResDto<T> {
  @IsNotEmpty()
  @IsString()
  status: Boolean;

  @IsNotEmpty()
  @IsString()
  code: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  data?: T;
}
