import { IsNotEmpty, IsEmail, IsString, Length } from "class-validator";

export class SignupDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(6,50)
    password: string;

    @IsString()
    fullname: string;
}