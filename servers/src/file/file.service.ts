import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    return `localhost:3000/files/${file.filename}`;
  }
}
