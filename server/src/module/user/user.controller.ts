import { LocalStrategy } from './../auth/strategies/local.strategy';
import { DeptService } from './../dept/dept.service';
import {
  UserDto,
  UserCreateDto,
  UserLoginDto,
  UserEditPassDto,
  UserTaskListDto,
} from './user.dto';
import { DemandUserService } from './../demand-user/demand-user.service';
import { AuthService } from './../auth/auth.service';
import { Utils } from './../../utils/index';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Http, success } from './../../common/Http';
import { PageData } from './../../common/Http';
import { BaseController } from '../../core/controller';
import {
  Controller,
  Get,
  Request,
  Response,
  Patch,
  Param,
  Post,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ReqData } from '../../decorator/req-data.decorator';
import dayjs = require('dayjs');
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController extends BaseController<User, UserDto> {
  constructor(
    protected readonly authService: AuthService,
    protected readonly service: UserService,
    protected readonly demandUserService: DemandUserService,
    protected readonly deptService: DeptService,
    protected readonly dto: UserDto,
  ) {
    super();
  }
  @Get()
  @success()
  async page(@Request() req): Promise<PageData<User>> {
    const reqData = Http.getReqDataByData(req);
    const { pageSize = 100, page, ts, ...where } = reqData;
    const { name, ...params } = where;
    const data = await this.service.search(pageSize, page, ts, {
      ...params,
      '%name': name,
      '^createdAt': 'desc',
    });

    for (const item of data.list) {
      const dept = await this.deptService.info({ id: item.deptId });
      item['deptName'] = dept.name;
    }

    return data;
  }

  @Post('register')
  @success()
  async register(@ReqData() reqData: UserCreateDto, @Req() req): Promise<User> {
    const ip = req.ip;
    const { pass, name, deptId = 1, roleId = 1 } = reqData;

    const existUsers = await this.infoData({ name });
    if (existUsers) {
      Http.failThrow(1004, '用户已存在', {});
    }

    const encryptPass = Utils.encrypt(pass);
    const id = await this.createData({
      name,
      pass: encryptPass,
      deptId,
      roleId,
      ip,
    });
    const user = await this.infoData({ id });
    return user;
  }

  @Put('pass')
  @UseGuards(AuthGuard('jwt'))
  @success()
  async passEdit(
    @ReqData() reqData: UserEditPassDto,
    @Req() req,
  ): Promise<User> {
    const ip = req.ip;
    const { originPass, pass, name } = reqData;

    const existUsers = await this.infoData({ name });
    if (!existUsers) {
      Http.failThrow(1004, '用户不存在', {});
    }

    if (existUsers.pass !== Utils.encrypt(originPass)) {
      Http.failThrow(1005, '用户原密码不正确', {});
    }

    const encryptPass = Utils.encrypt(pass);
    const id = await this.updateData(
      {
        pass: encryptPass,
      },
      { id: existUsers.id },
    );
    const user = await this.infoData({ id: existUsers.id });
    return user;
  }
  @Put('passOther')
  @UseGuards(AuthGuard('jwt'))
  @success()
  async passEditOther(@ReqData() reqData, @Req() req): Promise<User> {
    const ip = req.ip;
    const { pass, name } = reqData;

    const currUser = await this.authService.getUser(req);

    if (currUser.name !== 'admin') {
      Http.failThrow(1001, '非管理员不可修改他人密码');
    }

    const existUsers = await this.infoData({ name });
    if (!existUsers) {
      Http.failThrow(1004, '用户不存在', {});
    }

    const encryptPass = Utils.encrypt(pass);

    const id = await this.updateData(
      {
        pass: encryptPass,
      },
      { id: existUsers.id },
    );
    const user = await this.infoData({ id: existUsers.id });
    return user;
  }

  async nologin() {
    Http.failThrow(1000, '未登录或登录失效');
  }
  @UseGuards(LocalStrategy)
  @Post('login')
  async login(
    @ReqData() reqData: UserLoginDto,
    @Request() req,
    @Response() res,
  ) {
    const { name, pass } = reqData;

    if (!name) {
      Http.failThrow(1002, '请输入用户名');
    }

    if (!pass) {
      Http.failThrow(1003, '请输入用户密码', {});
    }

    const existUsers = await this.infoData({ name });
    if (!existUsers) {
      Http.failThrow(1004, '用户不存在', {});
    }

    const encryptPass = Utils.encrypt(pass);
    console.log('AdminController -> login -> encryptPass', encryptPass);
    const user = await this.infoData({ name, pass: encryptPass });
    if (!user) {
      Http.failThrow(1005, '密码不正确', {});
    } else {
      const { pass, ...result } = user;
      const token = await this.authService.login({ ...result });
      res.cookie('token', token);
      Http.succThrow(result);
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  @success()
  async logout(@Request() req, @Response() res,) {
    await this.authService.dologin(req);
    res.cookie('token', '');
    Http.succThrow();
  }

  @Get('taskList')
  @success()
  async taskList(@ReqData() reqData: UserTaskListDto): Promise<any> {
    const { userId, deptId } = reqData;

    const data = await this.demandUserService.list(reqData);

    return data;
  }
  @Patch(':id/chat')
  @success()
  async chatMsg(@Request() req, @Param() param): Promise<any> {
    const id = param.id;
    const reqData = Http.getReqDataByData(req);

    const user = { chatStatus: reqData.chatStatus } as User;

    const data = await this.service.update(user, { id });
    return data;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('whoami')
  @success()
  async whoami(@Request() req, @Response() res,) {
    const user = await this.authService.getUser(req);
    Http.succThrow(user);
  }
}
