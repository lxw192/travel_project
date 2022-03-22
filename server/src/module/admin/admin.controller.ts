import { AdminDto } from './admin.dto';
import { EventsGateway } from './../events/events.gateway';
import { Http, success } from '../../common/Http';
import { AuthService } from './../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { BaseController } from '../../core/controller';
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Response,
  Get,
} from '@nestjs/common';
import { Utils } from '../../utils';

@Controller('admin')
export class AdminController extends BaseController<Admin, AdminDto> {
  constructor(
    protected readonly service: AdminService,
    protected readonly authService: AuthService,
    private readonly eventsGateway: EventsGateway,
  ) {
    super();
  }

  async nologin() {
    Http.failThrow(1000, '未登录或登录失效');
  }
  // @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Request() req, @Response() res) {
    const reqData = Http.getReqDataByData(req);
    const { phone, pass } = reqData;

    if (!phone) {
      Http.failThrow(1002, '请输入手机号');
    }

    if (!pass) {
      Http.failThrow(1003, '请输入用户密码', {});
    }

    const existUsers = await this.infoData({ phone });
    if (!existUsers) {
      Http.failThrow(1004, '用户不存在', {});
    }

    const encryptPass = Utils.encrypt(pass);
    console.log('AdminController -> login -> encryptPass', encryptPass);
    const user = await this.infoData({ phone, pass: encryptPass });
    if (!user) {
      Http.failThrow(1005, '密码不正确', {});
    } else {
      const { pass, ...result } = user;
      const token = await this.authService.login({ id: user.id, phone });
      res.cookie('token', token);
      Http.succThrow(result);
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @success()
  async logout(@Request() req) {
    await this.authService.dologin(req);
    Http.succThrow();
  }

  @Get('/msg')
  async socket() {
    const server = this.eventsGateway.server;
    const sockets = server.sockets;
    console.log('TCL: EmailController -> socket -> sockets', sockets);
    Object.keys(sockets).forEach((key) => {
      sockets[key].emit('msg', { hello: 'world' });
      console.log('TCL: EmailController -> socket -> key', key);
    });
    return 'hello socket';
  }
}
