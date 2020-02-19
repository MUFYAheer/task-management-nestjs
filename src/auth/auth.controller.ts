import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    await this.authService.signUp(authCredentialsDto);
  }
}
