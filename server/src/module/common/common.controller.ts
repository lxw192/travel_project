import { success } from './../../common/Http';
import { Utils } from './../../utils/index';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Inject,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ClientProxy } from '@nestjs/microservices';

@Controller('common')
export class CommonController {
  constructor(
    @Inject('common')
    private readonly client: ClientProxy,
  ) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('filename'))
  @success()
  async upload(@UploadedFiles() files) {
    const urls = [];
    for (const file of files) {
      const filename = file.originalname;
      const path = './public/files/' + filename;
      const url = '/files/' + filename;
      await Utils.writeFile(path, file.buffer);
      urls.push(url);
    }
    return { urls };
  }
  // @Post('upload')
  // @UseInterceptors(FilesInterceptor('file'))
  // @success()
  // async upload(@UploadedFiles() files) {
  //   const urls = [];
  //   for (const file of files) {
  //     const filename = file.originalname;
  //     // const path = './public/files/' + filename;
  //     // const url = '/files/' + filename;
  //     // await Utils.writeFile(path, file.buffer);
  //     const observer = this.client.send(
  //       { cmd: 'upload' },
  //       { name: file.originalname, buffer: file.buffer },
  //     );
  //     const url = await Utils.getObserverVal<string>(observer);
  //     urls.push(url);
  //   }
  //   return { urls };
  // }
}
