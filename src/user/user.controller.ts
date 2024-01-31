import { Body, Controller, Get, Patch, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@src/auth/auth.guard';
import { Response } from 'express';
import { GetUser } from './decorators/';
import { UserService } from './user.service';
import { UserDto } from './dto/user-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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

  @UseGuards(AuthGuard)
  @Patch('/update/me')
  async updateMe(
    @GetUser('id') id: number,
    @Body() userDto: UserDto,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const updated_user = await this.userService.update(userDto, id);
    return res.status(200).send({
      success: true,
      message: 'Profile updated successfully',
      user: updated_user,
    });
  }
}
