import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

export async function makePostRequest<T>(apiKey: string, requestBody: any): Promise<T> {
    try {
      const apiUrl = `https://devnet.helius-rpc.com/?api-key=${apiKey}`;
  
      const response = await axios.post(apiUrl, requestBody);
      return response.data;
    } catch (error) {
      throw new BadRequestException('API request failed: ' + error.message);
    }
  }