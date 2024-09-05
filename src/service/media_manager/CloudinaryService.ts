import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { CloudinaryResult } from '../types/CloudinaryResource';

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
    let result: Promise<UploadApiResponse> = new Promise((resolve, reject) => {
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

  async fetchImages(folder_name: string) {
    const result: CloudinaryResult = await cloudinary.api.resources({
      type: 'upload',
      prefix: `upload_asset/${folder_name}`,
      max_results: 20,
    });
    return result.resources;
  }
}

async function deleteFolder(
  folder: string,
  contentsId: string[],
): Promise<void> {
  try {
    await cloudinary.api.delete_resources(contentsId);
    await cloudinary.api.delete_folder(`upload_asset/${folder}`);
  } catch (error) {
    throw error;
  }
}
