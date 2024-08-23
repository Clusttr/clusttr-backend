import { v2 as cloudinary } from 'cloudinary';

export class CloudinaryService {
  constructor(
    private readonly cloudName: string,
    private readonly apiKey: string,
    private readonly apiSecret: string,
  ) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  async uploadImage(image: Express.Multer.File, folder: string) {
    let result = new Promise((resolve, reject) => {
      let value = cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            folder: `asset_mint/${folder}`,
            use_filename: true,
            filename_override: image.originalname,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(image.buffer);
    });
    return result;
  }

  async uploadImages(images: Array<Express.Multer.File>, folder: string) {
    const uploadPromise = images.map((image) =>
      this.uploadImage(image, folder),
    );
    return Promise.all(uploadPromise);
  }
}

// cloudinary.v2.api
//   .delete_resources(['asset_mint/abc/file_i5tnoc', 'asset_mint/abc/fthwg5oboegzb49eyr2q'],
//     { type: 'upload', resource_type: 'image' })
//   .then(console.log);
