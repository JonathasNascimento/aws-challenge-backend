import { IsNotEmpty, MaxLength } from 'class-validator';

export class Category {
  id: number;

  @IsNotEmpty()
  @MaxLength(128)
  name: string;
}
