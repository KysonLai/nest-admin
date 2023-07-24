import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  Req,
  UseFilters,
  HttpException,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { getUserDto } from './dto/get-user.dto';
import { createUserDto } from './dto/create-user.dto';
import { TypeormFilter } from 'src/filters/typeorm.filter';
import { CreateUserPipe } from './pipes/create-user/create-user.pipe';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('user')
@UseFilters(new TypeormFilter())
@UseGuards(JwtGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private ConfigService: ConfigService,
  ) {}

  // 增
  @Post('/add')
  addUser(@Query(CreateUserPipe) dto: createUserDto): any {
    const user = dto as User;
    return this.userService.create(user);
  }

  // 删
  @Post('/del')
  async deleteUser(@Query() params: any): Promise<any> {
    const res = await this.userService.remove(params.id);
    const { affected } = res;
    if (!affected) {
      throw new HttpException('id不存在', 400);
    }
    return res;
  }
  // @Delete('/:id')
  // deleteUser(@Param('id') id: number): any {
  //   return this.userService.remove(id);
  // }

  // 改
  @Post('/update')
  updateUser(@Query() dto: any): any {
    const user = dto as User;
    return this.userService.update(user.id, user);
  }
  // @Patch()
  // updateUser(): any {
  //   const user = { username: 'kyson' } as User;
  //   return this.userService.update(1, user);
  // }

  // 查
  @Get('/list')
  async getUsers(@Query() query: getUserDto): Promise<any> {
    // const db = this.ConfigService.get('db');
    return this.userService.getList(query);
  }

  @Get('/profile')
  // 1. 装饰器的执行顺序，方法的装饰器有多个，则从下往上执行
  @UseGuards(AdminGuard)
  // @UseGuards(AuthGuard('jwt'))
  // 2. 如果使用UseGuards传递多个守卫，前面的guard没有执行结束，后面的不会执行
  // @UseGuards(AuthGuard('jwt'), AdminGuard)
  getUserProfile(@Query('id', ParseIntPipe) id: any, @Req() req: any): any {
    // req.user是通过AuthGuard('jwt')的validate方法返回的
    console.log('req: ', req.user);
    return this.userService.findProfile(id);
  }

  // 汇总查询
  @Get('/logsByGroup')
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(2);
    // 只返回需要的字段
    return res.map((item) => ({
      result: item.result,
      count: item.count,
    }));
  }
}
