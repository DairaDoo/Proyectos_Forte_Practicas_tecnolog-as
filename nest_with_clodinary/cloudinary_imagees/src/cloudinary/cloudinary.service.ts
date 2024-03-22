import { Injectable } from '@nestjs/common';
import {v2 as cloudinary} from 'cloudinary'

// add
import { CloudinaryResponse } from './cloudinary-response';

import { resolve } from 'path';
import { rejects } from 'assert';
import { buffer } from 'stream/consumers';
const streamifier = require('streamifier');


@Injectable()
export class CloudinaryService {
    // metodo para subir archivo
    uploadFile(file: Express.Multer.File): Promise <CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream (
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                },
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        })
    }
}
