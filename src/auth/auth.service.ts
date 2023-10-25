import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SigninDTO, SignupDTO } from "./dto";
import * as argon from "argon2";

@Injectable({})
export class AuthService {

    constructor(private readonly prisma: PrismaService) { }

    signIn(body: SigninDTO) {
        console.log({
            body
        });

        return {
            message: "sign in successful",
            success: true
        }
    }

    async signUp(body: SignupDTO) {
        const password: string = await argon.hash(body.password)
        const saved_user = await this.prisma.user.create({
            data: {
                email: body.email,
                password,
                fullname: body.fullname
            }
        })
        delete saved_user.password;

        return saved_user;
    }
}