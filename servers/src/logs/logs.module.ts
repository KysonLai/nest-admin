import { Module } from '@nestjs/common';
import { WinstonModule, WinstonModuleOptions } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { Console } from 'winston/lib/winston/transports';
import { utilities } from 'nest-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';

function createDailyRotateTrasnport(level: string, filename: string) {
  return new DailyRotateFile({
    level,
    dirname: 'logs',
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.simple(),
    ),
  });
}
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const timestamp = configService.get('log.timestamp') === 'true';
        const conbine = [];
        if (timestamp) {
          conbine.push(winston.format.timestamp());
        }
        conbine.push(utilities.format.nestLike());
        const consoleTransports = new Console({
          level: configService.get('log.log_level') || 'info',
          format: winston.format.combine(...conbine),
        });

        return {
          transports: [
            consoleTransports,
            ...(configService.get('log.log_on')
              ? [
                  createDailyRotateTrasnport('info', 'application'),
                  createDailyRotateTrasnport('warn', 'error'),
                ]
              : []),
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
