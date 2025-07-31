import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, UseGuards, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiHeader, ApiBody } from '@nestjs/swagger';
import { HttpClientService } from '../common/http-client.service';
import { AuthService } from '../auth/auth.service';

@ApiTags('api')
@Controller('api')
export class ApiController {
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly authService: AuthService,
  ) {}

  /**
   * GET isteği örneği - C# HttpGet metodunun kullanımı
   */
  @ApiOperation({ summary: 'Genel GET endpoint', description: 'Herhangi bir Logo endpoint\'inden veri getirir' })
  @ApiParam({ name: 'endpoint', description: 'Logo endpoint adı', example: 'items' })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Veri başarıyla getirildi' })
  @ApiResponse({ status: 401, description: 'Token gerekli veya geçersiz' })
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
  @ApiOperation({ summary: 'Genel POST endpoint', description: 'Herhangi bir Logo endpoint\'ine veri gönderir' })
  @ApiParam({ name: 'endpoint', description: 'Logo endpoint adı', example: 'salesOrders' })
  @ApiBody({ description: 'Gönderilecek veri' })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 201, description: 'Veri başarıyla oluşturuldu' })
  @ApiResponse({ status: 401, description: 'Token gerekli veya geçersiz' })
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
  @ApiOperation({ summary: 'Genel PUT endpoint', description: 'Herhangi bir Logo endpoint\'indeki veriyi günceller' })
  @ApiParam({ name: 'endpoint', description: 'Logo endpoint adı', example: 'items/5' })
  @ApiBody({ description: 'Güncellenecek veri' })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Veri başarıyla güncellendi' })
  @ApiResponse({ status: 401, description: 'Token gerekli veya geçersiz' })
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
  @ApiOperation({ summary: 'Genel PATCH endpoint', description: 'Herhangi bir Logo endpoint\'indeki veriyi kısmen günceller' })
  @ApiParam({ name: 'endpoint', description: 'Logo endpoint adı', example: 'items/5' })
  @ApiBody({ description: 'Güncellenecek veri alanları' })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Veri başarıyla güncellendi' })
  @ApiResponse({ status: 401, description: 'Token gerekli veya geçersiz' })
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
  @ApiOperation({ summary: 'Genel DELETE endpoint', description: 'Herhangi bir Logo endpoint\'indeki veriyi siler' })
  @ApiParam({ name: 'endpoint', description: 'Logo endpoint adı', example: 'items/5' })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Veri başarıyla silindi' })
  @ApiResponse({ status: 401, description: 'Token gerekli veya geçersiz' })
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