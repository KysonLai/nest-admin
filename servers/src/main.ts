import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AllExceptionFilter } from './filters/all-exception.filter';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 跨域配置
  app.enableCors({
    origin: '*', // 允许所有来源的请求访问该服务
  });

  // 接口前缀
  app.setGlobalPrefix('api/v1');

  // winston
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // 全局过滤器
  const httpAdapter = app.get(HttpAdapterHost);
  const logger = new Logger();
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));

  // 全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 过滤前端传递的冗余属性
    }),
  );

  // 全局注册拦截器，统一返回结果格式
  app.useGlobalInterceptors(new TransformInterceptor());

  // 头部安全配置
  app.use(helmet());

  // 限流
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15分钟
      max: 100, // 限制每个ip 每windowMs内请求100次
    }),
  );

  await app.listen(3000);
}
bootstrap();
