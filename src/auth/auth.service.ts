import { BadRequestException, Injectable } from '@nestjs/common';
import { Auth } from './auth.model';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { v4 as uuid } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService){}

  userDB: Auth[] = [];
  getAllUser(): Auth[]{
    return this.userDB;
  }

  signIn(body: AuthCredentialDto): {
    code: string;
    message: string;
    accessToken: string;
  } {
    const { username, password } = body;
    let matchData = null;
    this.userDB.forEach((item) => {
      if (item.username === username && item.password === password) {
        matchData = {
          id: item.id,
          username: item.username,
        };
        return;
      }
    });
    if (matchData) {
      const accessToken = this.jwtService.sign({
        id: matchData.id,
        username: matchData.username,
      });
      return {
        code: '200',
        message: 'success',
        accessToken,
      };
    }
    throw new BadRequestException('Fail Login');
  }

  signUp(authCredentialsDto: AuthCredentialDto): void {
    const { username, password } = authCredentialsDto;

    this.userDB.forEach((item) => {
      if (item.username === username) {
        throw new BadRequestException('Username must be Unique Data');
      }
    });

    this.userDB.push({
      id: uuid(),
      username,
      password,
    });
  }
}
