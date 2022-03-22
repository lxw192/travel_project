import {
  NestSchedule,
  Interval,
  Cron,
  Schedule,
  InjectSchedule,
} from 'nest-schedule';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ScheduleService extends NestSchedule {
  constructor(
    @InjectSchedule()
    private readonly schedule: Schedule,
  ) {
    super();
  }
  @Cron('0 0 0 5 *')
  async cronJon() {
    Logger.log('cron 任务');
  }

  @Interval(10 * 60 * 1000)
  intervalJob() {
    Logger.log('每一分钟执行一次 任务');
  }

  startRegisterMailTask() {
    this.schedule.scheduleIntervalJob(
      'registerMail',
      20 * 1000,
      async (): Promise<boolean> => {
        Logger.log('启动注册邮箱任务');
        return true;
      },
    );
  }
  stopRegisterMailTask() {
    this.schedule.cancelJob('registerMail');
    Logger.log('停止注册邮箱任务');
  }
  startRegisterAccountTask(name) {
    this.schedule.scheduleIntervalJob(
      'registerAccount-' + name,
      20 * 1000,
      async (): Promise<boolean> => {
        Logger.log('启动注册账号任务' + name);
        return true;
      },
    );
  }
  stopRegisterAccountTask(name) {
    this.schedule.cancelJob('registerMail' + name);
    Logger.log('停止注册账号任务' + name);
  }
}
