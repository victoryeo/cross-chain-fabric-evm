import { Injectable } from '@nestjs/common';
import axios from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class BlockchainUtil {
  constructor() {}

  async sendGetRequestToHLF(url: string, params): Promise<any> {
    const headers = {
      apiKey: process.env.HLF_API_KEY,
    };

    axiosRetry(axios, {
      retries: 1,
      retryDelay: retryCount => {
        return retryCount * 5000;
      },
    });

    return await axios.get(url, { params, headers });
  }

  async sendPostRequestToHLF(url: string, data: any): Promise<any> {
    const headers = {
      apiKey: process.env.HLF_API_KEY,
    };

    axiosRetry(axios, {
      retries: 1,
      retryDelay: retryCount => {
        return retryCount * 5000;
      },
    });

    return await axios.post(url, data, { headers });
  }
}
