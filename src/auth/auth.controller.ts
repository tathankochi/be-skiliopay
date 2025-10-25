import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }) {
        console.log(loginDto);
        return this.authService.login(loginDto.email, loginDto.password);
    }
    @Post('/register')
    handleRegister(@Body() registerUserDto: RegisterUserDto) {
        return this.authService.register(registerUserDto);
    }
}
