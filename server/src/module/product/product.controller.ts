import { ProductDto } from './product.dto';
import { ProductService } from './product.service';
import { BaseController } from '../../core/controller';
import { Controller } from '@nestjs/common';
import { Product } from './product.entity';

@Controller('product')
export class ProductController extends BaseController<Product, ProductDto> {
  constructor(protected readonly service: ProductService) {
    super();
  }
}
