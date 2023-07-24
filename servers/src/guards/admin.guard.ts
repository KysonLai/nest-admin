import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  // 常见的错误：在使用AdminGuard未导入UserModule
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. 获取请求对象
    const req = context.switchToHttp().getRequest();

    // 2. 角色判断
    const user = await this.userService.findOne(req.user.username);
    if (user && user.roles) {
      if (user.roles.filter((o) => o.id === 1).length > 0) {
        // 超管用户可访问
        return true;
      }
    }

    return false;
  }
}
