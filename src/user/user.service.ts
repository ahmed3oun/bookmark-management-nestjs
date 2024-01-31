import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { UserDto } from './dto/user-dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async update(userDto: UserDto, id: number) {
    try {
      const current_user = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });

      const fullname = userDto.fullname;
      let password;
      if (userDto.old_password) {
        if (userDto.new_password === userDto.confirm_password) {
          const is_matched = await argon.verify(
            current_user.password,
            userDto.old_password,
          );

          if (is_matched) {
            password = await argon.hash(userDto.new_password!);
          } else {
            throw new BadRequestException('Verify your password');
          }
        } else {
          throw new BadRequestException(
            `Password and Confirm password doesn't match`,
          );
        }
      }
      
      const updated_user = await this.prismaService.user.update({
        where: {
          id,
        },
        data: {
          fullname,
          password,
        },
      });

      delete updated_user.password;

      return updated_user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
