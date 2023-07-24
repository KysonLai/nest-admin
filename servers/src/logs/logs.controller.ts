import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
// import { JwtGuard } from 'src/guards/jwt.guard';
// import { AdminGuard } from 'src/guards/admin.guard';
import { IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
// import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { Serialize } from 'src/decorators/serialize.decorator';
// import { CaslGuard } from 'src/guards/casl.guard';
// import { Can, CheckPolices } from '../decorators/casl.decorator';
import { Logs } from './logs.entity';

class LogsDto {
  @IsString()
  @IsNotEmpty()
  msg: string;

  @IsString()
  id: string;

  @IsString()
  name: string;
}

class PublicLogsDto {
  @Expose()
  msg: string;

  @Expose()
  name: string;
}

@Controller('logs')
// @UseGuards(JwtGuard, AdminGuard, CaslGuard)
// @UseGuards()
// @CheckPolices((ability) => ability.can('read', Logs))
// @Can('read', Logs)
// UserInterceptor(new SerializationInterceptor(DTO))
export class LogsController {
  @Get()
  // @Can('read', Logs)
  getTest() {
    return 'test';
  }

  @Post()
  // @Can('create', Logs)
  @Serialize(PublicLogsDto)
  // @UseInterceptors(new SerializeInterceptor(PublicLogsDto))
  postTest(@Body() dto: LogsDto) {
    console.log(
      '🚀 ~ file: logs.controller.ts ~ line 15 ~ LogsController ~ postTest ~ dto',
      dto,
    );
    return dto;
  }
}
