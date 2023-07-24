import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeormFilter } from '../filters/typeorm.filter';
import { SigninUserDto } from './dto/signin-user.dto';
import { SerializeInterceptor } from 'src/interceptor/serialize.interceptor';
import { Expose } from 'class-transformer';

class ExposeDto {
  @Expose()
  username: string;
}

@Controller('auth')
@UseFilters(new TypeormFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  async signin(@Query() dto: any) {
    const { username, password } = dto;
    const token = await this.authService.signin(username, password);
    return {
      access_token: token,
    };
  }

  @Post('/signup')
  @UseInterceptors(new SerializeInterceptor(ExposeDto))
  signup(@Query() dto: SigninUserDto) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }
}
