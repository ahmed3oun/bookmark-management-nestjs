import { Controller, Post, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SigninDTO, SignupDTO } from "./dto";
import { Response } from "express";


@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signin')
    singIn(@Body() body: SigninDTO) {
        return this.authService.signIn(body);
    }

    @Post('/signup')
    async singUp(@Body() body: SignupDTO, @Res() res: Response) {
        const user = await this.authService.signUp(body);
        return res.status(201).send({
            statusCode: 201,
            message: 'User created successfully',
            user
        })
    }
}