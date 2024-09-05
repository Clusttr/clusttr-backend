import axios from 'axios';
import { createGenericFile, GenericFile } from '@metaplex-foundation/umi';

export interface CloudinaryResource {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  folder: string;
  url: string;
  secure_url: string;
}

export interface CloudinaryResult {
  resources: CloudinaryResource[];
  rate_limit_allowed: number;
  rate_limit_reset_at: string;
  rate_limit_remaining: number;
}

export async function generateGenericFile(
  resources: CloudinaryResource[],
): Promise<GenericFile[]> {
  const filesData = await Promise.all(
    resources.map(async (resources) => {
      let fileId = resources.public_id.split('/').pop();
      let fileNameList = fileId.split('_');
      fileNameList.pop();
      let fileName = fileNameList.join('_');
      const response = await axios.get(resources.secure_url, {
        responseType: 'arraybuffer',
      });
      return createGenericFile(new Uint8Array(response.data), fileName, {
        contentType: resources.resource_type,
        extension: resources.format,
      });
    }),
  );
  return filesData;
}
