import { Controller } from '@nestjs/common';
import { BaseController } from '../../core/controller';
import { PageEntity } from './page.entity';
import { PageDto } from './page.dto';
import { PageService } from './page.service';

@Controller('page')
export class PageController extends BaseController<
  PageEntity,
  PageDto
>{
  constructor(
    protected readonly service: PageService,
  ) {
    super();
  }

}
