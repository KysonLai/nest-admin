import { Injectable, ForbiddenException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  async signin(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (!user) {
      throw new ForbiddenException('用户不存在，请注册');
    }
    // 用户名，用户密码 比对
    const isPassword = await argon2.verify(user.password, password);
    if (!isPassword) {
      throw new ForbiddenException('用户名或密码错误');
    }
    // token
    return await this.jwt.signAsync({
      username: user.username,
      sub: user.id,
    });
  }

  async signup(username: string, password: string) {
    // 判断 用户是否存在
    const user = await this.userService.findOne(username);
    if (user) {
      throw new ForbiddenException('用户已存在');
    }
    const res = await this.userService.create({ username, password });
    return res;
  }
}
