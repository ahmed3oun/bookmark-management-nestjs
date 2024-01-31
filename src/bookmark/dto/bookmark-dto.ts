import { IsOptional, IsString } from 'class-validator';

export class BookmarkDto {
  @IsOptional()
  id: number;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  link: string;
}
