import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
} from 'class-validator';

export class UserDto {

  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsOptional()
  @Length(6, 50)
  old_password: string | undefined;

  @IsOptional()
  @Length(6, 50)
  new_password: string | undefined;

  @IsOptional()
  @Length(6, 50)
  confirm_password: string | undefined;
}
