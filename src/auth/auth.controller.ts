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
    return this.authService.getAllUser();
  }

  // @Get('/cache')
  // async getCache(@Query('id') id : string): Promise<string> {
  //   const savedTime = await this.cacheManager.get(id);
  //   if (savedTime) {
  //     return 'saved time : ' + savedTime;
  //   }
  //   const now = new Date().getTime();
  //   await this.cacheManager.set(id, now, { ttl: 600 });
  //   return 'save new time : ' + now;
  // }

  @Post('/signin')
  signin(@Body(ValidationPipe) body: AuthCredentialDto) {
    return this.authService.signIn(body);
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialsDto);
  }
}
