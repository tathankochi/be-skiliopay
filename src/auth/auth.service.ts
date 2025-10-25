import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async login(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (!compareSync(pass, user?.password ?? '')) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user?._id, username: user?.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async register(registerUserDto: RegisterUserDto): Promise<any> {
        const newUser = await this.usersService.register(registerUserDto);
        return {
            _id: newUser?._id,
        };
    }
}
