import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { TypeORMError, QueryFailedError } from 'typeorm';

@Catch(TypeORMError)
export class TypeormFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    let code = 500;
    let msg: unknown = exception['response'] || '服务器错误';
    if (exception instanceof QueryFailedError) {
      code = exception.driverError.errno;
      msg = exception.message;
      if (exception.driverError.errno && exception.driverError.errno === 1062) {
        msg = '唯一索引重复';
      }
    }

    // 响应 请求对象
    const response = ctx.getResponse();
    response.status(500).json({
      code,
      timestamp: new Date().toISOString(),
      message: msg,
      // path: request.url,
      // method: request.method,
    });
  }
}
