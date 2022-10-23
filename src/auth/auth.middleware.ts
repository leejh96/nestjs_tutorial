import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
  NestMiddleware
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      const headerToken = req.headers.authorization;
      const decrypt = this.jwtService.verify(headerToken);
      const storedRedisToken = await this.cacheManager.get(decrypt.username);
      if (storedRedisToken && storedRedisToken === headerToken) {
        console.log('문제 없음!');
      } else if (!storedRedisToken) {
        console.log('토큰 레디스에 저장');
        await this.cacheManager.set(decrypt.username, headerToken, {
          ttl: 600,
        });
      } else {
        console.log('중복로그인!');
        throw new BadRequestException('중복로그인 감지!');
      }
    } else {
      console.log('헤더에 token 없음');
    }
    next();
  }
}
