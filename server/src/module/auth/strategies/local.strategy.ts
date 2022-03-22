import { UserService } from './../../user/user.service';
import { Http } from '../../../common/Http';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    super();
  }

  async validate(name: string, pass: string): Promise<any> {
    // todo redis是否存在
    const user = await this.authService.validateUser(name, pass);
    if (!user) {
      Http.failThrow(1000, '未登录或登录失效');
    }
    return user;
  }
}
