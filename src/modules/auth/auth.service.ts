import { HttpException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

    constructor(private userService: UserService, private jwtService: JwtService) {

    }

    async signPayload(payload: any) {
        return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '10D' })
    }

    async validateUser(payload: any) {
        return await this.userService.findOneByConditions(payload);
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(password: string, encPassword): Promise<Boolean> {

        try {
            return await bcrypt.compare(password, encPassword)
        } catch (error) {
            throw new HttpException(error, error.status)
        }

    }
}
