import { InfoDto } from './../../core/commonDto';
import { ValidationPipe } from './../../pipe/ValidationPipe';
import {
  DemandDto,
  DemandStatusDto,
  DemandPageDto,
  DemandUpdateDto,
} from './demand.dto';
import { OperateLogService } from './../operate-log/operate-log.service';
import { AuthService } from './../auth/auth.service';
import { DeptService } from './../dept/dept.service';
import { UserService } from './../user/user.service';
import { DemandUserService } from './../demand-user/demand-user.service';
import { DemandService } from './demand.service';
import { Demand } from './demand.entity';
import { BaseController } from '../../core/controller';
import {
  Controller,
  Get,
  Request,
  Post,
  Put,
  Param,
  Patch,
  UsePipes,
} from '@nestjs/common';
import { success, PageData, Http } from '../../common/Http';
import { ModuleService } from '../module/module.service';
import { ProductService } from '../product/product.service';
import { ReqData } from '../../decorator/req-data.decorator';
import { reqDataValid } from '../../utils/reqDataValid';

@Controller('demand')
export class DemandController extends BaseController<Demand, DemandDto> {
  constructor(
    protected readonly service: DemandService,
    protected readonly authService: AuthService,
    protected readonly userService: UserService,
    protected readonly deptService: DeptService,
    protected readonly productService: ProductService,
    protected readonly moduleService: ModuleService,
    protected readonly demandUserService: DemandUserService,
    protected readonly operateLogService: OperateLogService,
    protected readonly dto: DemandDto,
  ) {
    super();
  }
  @Get()
  @success()
  async page(@ReqData() reqData: DemandPageDto): Promise<PageData<Demand>> {
    const { pageSize, page, ts, ...where } = reqData;
    const data = await this.service.search(pageSize, page, ts, where);
    for (const item of data.list) {
      const demandUsers = await this.demandUserService.list({
        demandId: item.id,
      });
      const product = await this.productService.info({ id: item.productId });
      const module = await this.moduleService.info({ id: item.moduleId });
      const createUser = await this.userService.info({
        id: item.createUserId,
      });

      item['createUserName'] = createUser.name;
      item['productName'] = product.name;
      item['moduleName'] = module.name;
      item['users'] = demandUsers;

      for (const item of demandUsers) {
        const user = await this.userService.info({ id: item.userId });
        const dept = await this.deptService.info({ id: item.deptId });
        item['userName'] = user.name;
        item['deptName'] = dept.name;
      }
    }

    return data;
  }
  @Get(':id')
  @success()
  async info(@Request() req, @ReqData() reqData: InfoDto): Promise<Demand> {
    const { id } = reqData;
    const data = await this.service.info({ id });

    const demandUsers = await this.demandUserService.list({
      demandId: data.id,
    });
    const product = await this.productService.info({ id: data.productId });
    const module = await this.moduleService.info({ id: data.moduleId });
    const createUser = await this.userService.info({ id: data.createUserId });

    data['createUserName'] = createUser.name;
    data['productName'] = product.name;
    data['moduleName'] = module.name;
    data['users'] = demandUsers;

    for (const item of demandUsers) {
      const user = await this.userService.info({ id: item.userId });
      const dept = await this.deptService.info({ id: item.deptId });
      item['userName'] = user.name;
      item['deptName'] = dept.name;
    }

    return data;
  }

  @Post()
  @success()
  async create(@Request() req) {
    const reqData = Http.getReqDataByData(req);
    const {
      type,
      name,
      level,
      desc,
      siteType,
      productId,
      moduleId,
      prdUrl,
      uiUrl,
      interUrl,
      testCaseUrl,
      createUserId,
      productUserId,
      webUserId,
      serverUserId,
      testUserId,
      demandStartAt,
      demandEndAt,
      uiStartAt,
      uiEndAt,
      devStartAt,
      devEndAt,
      jointStartAt,
      jointEndAt,
      testStartAt,
      testEndAt,
      preOnlineStartAt,
      preOnlineEndAt,
      onlineAt,
      users,
    } = reqData;

    const demandId = await this.service.create({
      type,
      name,
      level,
      desc,
      siteType,
      productId,
      moduleId,
      prdUrl,
      uiUrl,
      interUrl,
      testCaseUrl,
      createUserId,
      productUserId,
      webUserId,
      serverUserId,
      testUserId,
      demandStartAt,
      demandEndAt,
      devStartAt,
      devEndAt,
      uiStartAt,
      uiEndAt,
      jointStartAt,
      jointEndAt,
      testStartAt,
      testEndAt,
      preOnlineStartAt,
      preOnlineEndAt,
      onlineAt,
    });

    for (const item of users) {
      const { userId, deptId, startAt, endAt } = item;

      const createId = await this.demandUserService.create({
        demandId: demandId as number,
        userId,
        deptId,
        startAt,
        endAt,
        status: 2,
      });
    }
    return {
      id: demandId,
    };
  }
  @Put(':id')
  @success()
  async update(@Param('id') id, @ReqData() reqData: DemandUpdateDto) {
    const {
      type,
      name,
      level,
      desc,
      siteType,
      productId,
      moduleId,
      prdUrl,
      uiUrl,
      interUrl,
      testCaseUrl,
      createUserId,
      productUserId,
      webUserId,
      serverUserId,
      testUserId,
      demandStartAt,
      demandEndAt,
      uiStartAt,
      uiEndAt,
      devStartAt,
      devEndAt,
      jointStartAt,
      jointEndAt,
      testStartAt,
      testEndAt,
      preOnlineStartAt,
      preOnlineEndAt,
      onlineAt,
      users,
    } = reqData;

    const result = await this.service.update(
      {
        type,
        name,
        level,
        desc,
        siteType,
        productId,
        moduleId,
        prdUrl,
        uiUrl,
        interUrl,
        testCaseUrl,
        createUserId,
        productUserId,
        webUserId,
        serverUserId,
        testUserId,
        demandStartAt,
        demandEndAt,
        uiStartAt,
        uiEndAt,
        devStartAt,
        devEndAt,
        jointStartAt,
        jointEndAt,
        testStartAt,
        testEndAt,
        preOnlineStartAt,
        preOnlineEndAt,
        onlineAt,
      },
      { id },
    );

    const delResult = await this.demandUserService.delete({ demandId: id });

    for (const item of users) {
      const { userId, deptId, startAt, endAt } = item;

      const createId = await this.demandUserService.create({
        demandId: id as number,
        userId,
        deptId,
        startAt,
        endAt,
        status: 2,
      });
    }
    return {
      id,
    };
  }

  @Patch('/status')
  @success()
  async status(@Request() req, @ReqData() reqData: DemandStatusDto) {
    const { id, status, desc } = reqData;
    const currUser = await this.authService.getUser(req);

    const info = await this.service.info({ id });
    if (currUser.roleId === 1) {
      //
      const demandUsers = await this.demandUserService.list({ demandId: id });
      const noFinishedUser = demandUsers.filter((item) => item.status !== 1);
      if (noFinishedUser.length) {
        Http.failThrow(2001, '还有用户未完成此阶段任务');
      }
      await this.service.update({ status, desc }, { id });
    } else if (currUser.roleId === 2) {
      let note: string = (info.desc as string) + desc;
      await this.demandUserService.update(
        { status },
        { demandId: id, userId: currUser.id },
      );
      await this.service.update({ status, desc }, { id });
    }

    // await this.operateLogService.create({
    //   userId: currUser.id,
    //   moduleId: 'demand',
    //   desc: desc,
    // })

    return { id };
  }
}
