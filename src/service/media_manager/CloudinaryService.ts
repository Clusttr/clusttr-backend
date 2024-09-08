import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CloudinaryResult } from '../types/CloudinaryResource';

export class CloudinaryService {
  constructor(cloudName: string, apiKey: string, apiSecret: string) {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }

  async uploadImage(image: Express.Multer.File, folder: string) {
    const name = image.originalname.split('.').shift();
    let result: Promise<UploadApiResponse> = new Promise((resolve, reject) => {
      let value = cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto',
            folder: `asset_mint/${folder}`,
            public_id: name,
            overwrite: true,
            invalidate: true,
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

  async fetchImages(assetId: string) {
    const result: CloudinaryResult = await cloudinary.api.resources({
      type: 'upload',
      prefix: `asset_mint/${assetId}`,
      max_results: 20,
    });
    return result.resources;
  }

  async deleteFolder(folder: string, assetPublicIds: string[]): Promise<void> {
    try {
      await cloudinary.api.delete_resources(assetPublicIds);
      await cloudinary.api.delete_folder(`asset_mint/${folder}`);
    } catch (error) {
      throw error;
    }
  }
}
