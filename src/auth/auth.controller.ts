import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(AuthGuard())
  getAllUser(@Req() req) {
    console.log(req);
    return this.authService.getAllUser();
  }

  @Post('/signin')
  signin(@Body(ValidationPipe) body: AuthCredentialDto) {
    return this.authService.signIn(body);
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialsDto);
  }
}
