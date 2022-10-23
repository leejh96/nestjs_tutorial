import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // 토큰 검증부분
    super({
      secretOrKey: 'secret',
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    });
  }

  //검증 후에 실행된다?
  validate(payload) {
    // request.user에 들어갈 데이터를 return
    const { id } = payload;
    let isMatch = false;

    this.authService.userDB.forEach((item) => {
      if (item.id === id) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
}