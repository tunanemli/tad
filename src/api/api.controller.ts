import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UseGuards, Headers } from '@nestjs/common';
import { HttpClientService } from '../common/http-client.service';
import { AuthService } from '../auth/auth.service';

@Controller('api')
export class ApiController {
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly authService: AuthService,
  ) {}

  /**
   * GET isteği örneği - C# HttpGet metodunun kullanımı
   */
  @Get('data/:endpoint')
  async getData(
    @Param('endpoint') endpoint: string,
    @Headers('authorization') authHeader?: string,
  ) {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      return { error: 'Token gerekli' };
    }

    const url = `${this.getBaseUrl()}${endpoint}`;
    return await this.httpClientService.httpGet(url, token);
  }

  /**
   * POST isteği örneği - C# HttpPost metodunun kullanımı
   */
  @Post('data/:endpoint')
  async postData(
    @Param('endpoint') endpoint: string,
    @Body() data: any,
    @Headers('authorization') authHeader?: string,
  ) {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      return { error: 'Token gerekli' };
    }

    const url = `${this.getBaseUrl()}${endpoint}`;
    return await this.httpClientService.httpPost(url, data, token);
  }

  /**
   * PUT isteği örneği - C# HttpPut metodunun kullanımı
   */
  @Put('data/:endpoint')
  async putData(
    @Param('endpoint') endpoint: string,
    @Body() data: any,
    @Headers('authorization') authHeader?: string,
  ) {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      return { error: 'Token gerekli' };
    }

    const url = `${this.getBaseUrl()}${endpoint}`;
    return await this.httpClientService.httpPut(url, data, token);
  }

  /**
   * PATCH isteği örneği - C# HttpPatch metodunun kullanımı
   */
  @Patch('data/:endpoint')
  async patchData(
    @Param('endpoint') endpoint: string,
    @Body() data: any,
    @Headers('authorization') authHeader?: string,
  ) {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      return { error: 'Token gerekli' };
    }

    const url = `${this.getBaseUrl()}${endpoint}`;
    return await this.httpClientService.httpPatch(url, data, token);
  }

  /**
   * DELETE isteği örneği
   */
  @Delete('data/:endpoint')
  async deleteData(
    @Param('endpoint') endpoint: string,
    @Headers('authorization') authHeader?: string,
  ) {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      return { error: 'Token gerekli' };
    }

    const url = `${this.getBaseUrl()}${endpoint}`;
    return await this.httpClientService.httpDelete(url, token);
  }

  /**
   * Authorization header'dan token'ı çıkar
   */
  private extractToken(authHeader?: string): string {
    if (!authHeader) return '';
    
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }
    
    return '';
  }

  /**
   * Base URL'i döndür (config'den alınabilir)
   */
  private getBaseUrl(): string {
    return process.env.BASE_URL || 'https://api.logo.com.tr';
  }
}