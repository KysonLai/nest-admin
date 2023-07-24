import {
  BadRequestException,
  ExceptionFilter,
  ForbiddenException,
  HttpAdapterHost,
  HttpException,
  HttpStatus,
  LoggerService,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ArgumentsHost, Catch } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

// import * as requestIp from 'request-ip';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly logger: LoggerService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const code = exception['status'] || 500;

    // 处理返回的message
    let error: unknown = exception['response'] || '服务器错误';
    if (exception instanceof BadRequestException) {
      error = exception['response']['message'][0];
    }
    if (exception instanceof ForbiddenException) {
      error = '该用户没有权限访问';
    }
    if (exception instanceof UnauthorizedException) {
      error = '未授权，请登录';
    }
    if (exception instanceof NotFoundException) {
      error = `请求地址错误：${request.url}`;
    }

    const responseBody = {
      code,
      timestamp: new Date().toISOString(),
      message: error,
      // headers: request.headers,
      // query: request.query,
      // body: request.body,
      // params: request.params,
      // 还可以加入一些用户信息
      // IP信息
      // ip: requestIp.getClientIp(request),
      // exceptioin: exception['name'],
    };

    this.logger.error('[toimc]', responseBody);
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
