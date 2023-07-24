import { Module, Logger, Global } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

// 配置
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './configuration';

// TypeOrm
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Profile } from './user/profile.entity';
import { Roles } from './roles/roles.entity';
import { Logs } from './logs/logs.entity';
import { RolesModule } from './roles/roles.module';
import { FileModule } from './file/file.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LogsModule } from './logs/logs.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 全局引入
      load: [Configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.host'),
        port: configService.get('db.port'), // 来自process.env的每个值都是字符串，前面加+转数字
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.name'),
        autoLoadEntities: true, // 自动加载模块
        entities: [User, Profile, Logs, Roles],
        synchronize: configService.get('db.sync'), // 开启同步，生产中要禁止
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'dist/files'), // 指定静态资源目录
      serveRoot: '/files', // 指定访问静态资源的 URL 前缀
    }),
    UserModule,
    AuthModule,
    RolesModule,
    FileModule,
    LogsModule,
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}
