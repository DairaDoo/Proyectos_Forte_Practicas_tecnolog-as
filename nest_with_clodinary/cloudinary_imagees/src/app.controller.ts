import { Controller, FileTypeValidator, Get, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cloudinaryService: CloudinaryService
    ) { }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  // metodo para subir imagen.
  // antes de subir la imagen será validado el peso del archivo y tipo de archivo.
  uploadImage (
    @UploadedFile (
      new ParseFilePipe( {
        validators: [
          new MaxFileSizeValidator({maxSize: 1024 * 1024 * 4}),
          new FileTypeValidator({fileType: '.(png|jpeg|jpg)'}),
        ]
      }),
    ) file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
    }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
