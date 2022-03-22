import { RedisModule } from './module/redis/redis.module';
import { AuthModule } from './module/auth/auth.module';
// import { ScheduleService } from './schedule/index';
import { Module } from '@nestjs/common';
import { ConfigModule as EnvConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
// import { ScheduleModule } from 'nest-schedule';
import { EventsModule } from './module/events/events.module';
import { AdminModule } from './module/admin/admin.module';
import { UserModule } from './module/user/user.module';
import { CommonModule } from './module/common/common.module';
import { DemandModule } from './module/demand/demand.module';
import { DeptModule } from './module/dept/dept.module';
import { RoleModule } from './module/role/role.module';
import { ProductModule } from './module/product/product.module';
import { ModuleModule } from './module/module/module.module';
import { DemandUserModule } from './module/demand-user/demand-user.module';
import { OperateLogModule } from './module/operate-log/operate-log.module';
import { InterModule } from './module/inter/inter.module';
import { ConfigModule } from './module/config/config.module';
import { ConfigTypeModule } from './module/config-type/config-type.module';
import { ComponentModule } from './module/component/component.module';
import { ControlModule } from './module/control/control.module';
import { ControlFieldModule } from './module/control-field/control-field.module';
import { DataTypeModule } from './module/data-type/data-type.module';
import { ComponentPropControlDataModule } from './module/component-prop-control-data/component-prop-control-data.module';
import { ComponentPropControlModule } from './module/component-prop-control/component-prop-control.module';
import { ComponentPropModule } from './module/component-prop/component-prop.module';
import { GroupModule } from './module/group/group.module';
import { PageModule } from './module/page/page.module';
import { ComponentStatModule } from './module/component-stat/component-stat.module';
import { FeatureToggleModule } from './module/feature-toggle/feature-toggle.module';

console.log("🚀 ~ file: app.module.ts ~ line 41 ~ process.env.ENV", process.env.ENV)
@Module({
  imports: [
    EnvConfigModule.forRoot({
      envFilePath: [
        process.env.ENV === 'production' ? '.env.production' : '.env',
      ],
    }),
    TypeOrmModule.forRoot({
      // name: 'mysql',
      type: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1', // Redis host
      port: parseInt(process.env.DB_PORT, 10) || 3000,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      charset: 'utf8mb4',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
      // debug: true,
    }),
    EventsModule,
    // ScheduleModule.register(),
    RedisModule.register({
      port: (process.env.REDIS_PORT || 6379) as number, // Redis port
      host: process.env.REDIS_HOST || '127.0.0.1', // Redis host
      password: '',
      db: 0,
    }),
    AuthModule,
    AdminModule,
    UserModule,
    CommonModule,

    DemandModule,

    DeptModule,

    RoleModule,

    ProductModule,

    ModuleModule,

    DemandUserModule,

    OperateLogModule,

    InterModule,

    ConfigModule,

    ConfigTypeModule,

    ComponentModule,

    ControlModule,

    ControlFieldModule,

    DataTypeModule,

    ComponentPropControlDataModule,

    ComponentPropControlModule,

    ComponentPropModule,

    GroupModule,

    PageModule,

    ComponentStatModule,

    FeatureToggleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class App {}
