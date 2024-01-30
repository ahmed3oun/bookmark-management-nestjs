import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDTO, SignupDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(body: SigninDTO) {
    try {
      const current_user = await this.prisma.user.findUniqueOrThrow({
        where: {
          email: body.email,
        },
      });

      const pwdMatches = await argon.verify(
        current_user.password,
        body.password,
      );

      if (!pwdMatches) {
        throw new BadRequestException('Bad Credentials');
      }

      delete current_user.password;

      const payload = {
        id: current_user.id,
        fullname: current_user.fullname,
        email: current_user.email,
      };

      return {
        token: await this.jwtService.signAsync(payload),
      };

      return current_user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Bad credentials');
        }
      }
      throw error;
    }
  }

  async signUp(body: SignupDTO) {
    try {
      const password: string = await argon.hash(body.password);
      const saved_user = await this.prisma.user.create({
        data: {
          email: body.email,
          password,
          fullname: body.fullname,
        },
      });
      delete saved_user.password;
      return saved_user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
}
