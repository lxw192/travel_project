import { Http } from '../../../common/Http';
import { JWT_SECRET } from '../../../config/index';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      // jwtFromRequest: ExtractJwt.fromHeader('token'),
      // jwtFromRequest: function(req) {
      //   const token =
      //     ExtractJwt.fromHeader('token')(req) ||
      //     req.headers.cookie
      //       .split(';')
      //       .find(item => item.indexOf('token=') === 0)
      //       .substr(6);
      //   console.log(
      //     'TCL: JwtStrategy -> constructor -> req.headers.token',
      //     req.headers.cookie,
      //   );
      //   return token;
      // },

      jwtFromRequest: (req) => {
        const token = JwtStrategy.getToken(req);
        if (!token) {
          Http.failThrow(1000, '登录失效或未登录');
        } else {
          const data: any = this.jwtService.decode(token, { json: true });
          if (data.exp * 1000 < Date.now()) {
            console.log(
              'TCL: JwtStrategy -> constructor -> data',
              data,
              Date.now(),
              (Date.now() - data.exp * 1000) / 3600,
            );
            Http.failThrow(1000, '登录失效或未登录');
          }
        }
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
    const self = this;
  }

  async validate(payload: any) {
    const user = payload;
    if (user.id) {
      return true;
    } else {
      // return false;
      Http.failThrow(1000, '登录失效或未登录');
    }
  }

  static getToken(req: any) {
    let token = ExtractJwt.fromHeader('token')(req);
    if (token) {
      return token;
    }

    let tokenStr = (req.headers.cookie || '')
      .split(';')
      .find((item) => item.trim().indexOf('token=') === 0);
    if (tokenStr) {
      return tokenStr.trim().substr(6);
    }
    return '';
  }
}
