import { IsNotEmpty, IsEmail, IsString } from "class-validator";

export class SigninDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}