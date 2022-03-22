import { UserDto } from './user.dto';
import { DemandUserModule } from './../demand-user/demand-user.module';
import { Global } from '@nestjs/common';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), DemandUserModule],
  providers: [UserService, UserDto],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
