import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

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

// cloudinary.v2.api
//   .delete_resources(['asset_mint/abc/file_i5tnoc', 'asset_mint/abc/fthwg5oboegzb49eyr2q'],
//     { type: 'upload', resource_type: 'image' })
//   .then(console.log);

export interface CloudinaryResource {
  public_id: string;
  folder: string;
  filename: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  url: string;
  secure_url: string;
  bytes: number;
  width: number;
  height: number;
  aspect_ratio: number;
  tags: string[];
  // Add more properties as needed based on the response
}

interface CloudinaryResult {
  resources: CloudinaryResource[];
  next_cursor?: string;
  // Add more properties as needed based on the response
}
