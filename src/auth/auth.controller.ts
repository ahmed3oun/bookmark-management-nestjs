import {
  Controller,
  Post,
  Body,
  Res,
  Param,
  ForbiddenException,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDTO, SignupDTO } from './dto';
import { Response } from 'express';
import {
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
} from '@prisma/client/runtime/library';
import { AuthGuard } from './auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async singIn(
    @Body() body: SigninDTO,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const user = await this.authService.signIn(body);
    return res.status(200).send({
      statusCode: 200,
      message: 'Logged In successfully',
      user,
    });
  }

  @Post('/signup')
  async singUp(
    @Body() body: SignupDTO,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const user = await this.authService.signUp(body);
    return res.status(201).send({
      statusCode: 201,
      message: 'User created successfully',
      user,
    });
  }
}
