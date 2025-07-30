import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class HttpClientService {
  private readonly logger = new Logger(HttpClientService.name);

  constructor(private readonly httpService: HttpService) {}

  /**
   * C# HttpGet metodunun NestJS karşılığı
   */
  async httpGet(url: string, accessToken: string): Promise<any> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            'Accept': 'application/json, application/octet-stream',
            'Authorization': `Bearer ${accessToken}`,
          },
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`GET ${url} - Hata:`, error.message);
      return this.handleError(error);
    }
  }

  /**
   * C# HttpPost metodunun NestJS karşılığı
   */
  async httpPost(url: string, param: any, accessToken: string): Promise<any> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.post(url, param, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`POST ${url} - Hata:`, error.message);
      return this.handleError(error);
    }
  }

  /**
   * C# HttpPut metodunun NestJS karşılığı
   */
  async httpPut(url: string, param: any, accessToken: string): Promise<any> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.put(url, param, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`PUT ${url} - Hata:`, error.message);
      return this.handleError(error);
    }
  }

  /**
   * C# HttpPatch metodunun NestJS karşılığı
   */
  async httpPatch(url: string, param: any, accessToken: string): Promise<any> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.patch(url, param, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`PATCH ${url} - Hata:`, error.message);
      return this.handleError(error);
    }
  }

  /**
   * HTTP DELETE metodu (C# kodunda yoktu ama ekledim)
   */
  async httpDelete(url: string, accessToken: string): Promise<any> {
    try {
      const response: AxiosResponse = await firstValueFrom(
        this.httpService.delete(url, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        }),
      );

      return response.data;
    } catch (error) {
      this.logger.error(`DELETE ${url} - Hata:`, error.message);
      return this.handleError(error);
    }
  }

  /**
   * C# kodundaki catch bloklarının karşılığı - hata yönetimi
   */
  private handleError(error: any): string {
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 401) {
        throw new HttpException('Unauthorized - Token geçersiz veya süresi dolmuş', HttpStatus.UNAUTHORIZED);
      }
      
      return JSON.stringify(data) || error.message;
    } else if (error.request) {
      // Request was made but no response received
      return 'Network error - Sunucuya ulaşılamıyor';
    } else {
      // Something else happened
      return error.message;
    }
  }
}