import { BadRequestException, Body, ConflictException, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    if (!email || !password) {
      throw new BadRequestException('Missing email or password');
    }
    return this.authService.signIn(email, password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    if (!email || !password) {
      throw new BadRequestException('Missing email or password');
    }
    try {
      return this.authService.signUp(email, password);
    } catch (error) {
      throw new ConflictException(error.message)
    } 
  }
}
