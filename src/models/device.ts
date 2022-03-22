// eslint-disable-next-line prettier/prettier
import { IsAlpha, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from 'class-validator';

export class Device {
  id: number;

  @IsNumber()
  categoryId: number;

  @IsAlpha()
  @IsString()
  @MaxLength(16)
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  partNumber: number;
}
