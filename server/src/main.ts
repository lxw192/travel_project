import { NestFactory } from '@nestjs/core';
import { App } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from './pipe/ValidationPipe';
import { AuthGuard } from '@nestjs/passport';
import { RedisIoAdapter } from './module/adapters/redis-io.adapter';

// try {
//   const easyMonitor = require('easy-monitor');
//   easyMonitor('admin-server');
// } catch (error) {
//   console.log(error);
// }

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(App);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new AuthGuard('jwt'));
  app.useWebSocketAdapter(new RedisIoAdapter(app));

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
}
bootstrap();
