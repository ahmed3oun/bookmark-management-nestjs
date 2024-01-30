import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/auth/auth.guard';
import { Response, Request } from 'express';
import { GetUser } from './decorators/get_user.decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  // TODO: TO TEST
  @UseGuards(AuthGuard)
  @Get('/me')
  async getMe(
    @GetUser() user,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const current_user = user;
    delete current_user.exp;
    delete current_user.iat;

    return res.status(200).send({
      statusCode: 200,
      message: 'Data fetched successfully',
      user: current_user,
    });
  }
}
