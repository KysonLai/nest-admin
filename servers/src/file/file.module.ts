import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 指定文件存储目录
        destination: path.join(__dirname, '../files'),
        // 通过时间戳来重命名上传的文件名
        filename: (_, file, callback) => {
          const fileName = `${
            new Date().getTime() + path.extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
