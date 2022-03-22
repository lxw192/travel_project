import { User } from './../user/user.entity';
import { RedisService } from './../redis/redis.service';
import { LocalStrategy } from './strategies/local.strategy';
import { Admin } from './../admin/admin.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly userService: UserService,

  ) {}

  async login(data: any) {
    const token: string = this.jwtService.sign(data);
    this.redisService.client.set(`token_${data.id}`, token, 'EX', 24 * 60 * 60);
    return token;
  }

  async dologin(req) {
    const token = JwtStrategy.getToken(req);
    console.log('TCL: AuthService -> dologin -> token', token);
    const data: any = this.jwtService.decode(token, { json: true });
    console.log('TCL: AuthService -> dologin -> data', data);
    this.redisService.client.del(`token_${data.id}`);
  }

  async getUser(req): Promise<User> {
    const token = JwtStrategy.getToken(req);
    // console.log("AuthService -> token", token)
    const data: any = this.jwtService.decode(token, { json: true });
    // console.log("AuthService -> data", data)
    return data as User;
  }

  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.userService.info({name});
    if (user && user.pass === pass) {
      const { pass, ...result } = user;
      return result;
    }
    return null;
  }
}
