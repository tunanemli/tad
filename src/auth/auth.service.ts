import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthRequestDto, AuthResponseDto } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private accessToken: string = '';
  private tokenExpiry: Date = new Date();

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * C# getAccessToken metodunun NestJS karşılığı
   */
  async getAccessToken(authRequest: AuthRequestDto): Promise<string> {
    try {
      const clientId = this.configService.get<string>('clientId');
      const clientSecret = this.configService.get<string>('clientSecret');
      const baseUrl = this.configService.get<string>('baseUrl');

      // Basic Auth header oluştur (clientId:clientSecret'ı base64 encode et)
      const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

      // Form data oluştur (C# kodundaki gibi)
      const formData = new URLSearchParams();
      formData.append('grant_type', 'password');
      formData.append('username', encodeURIComponent(authRequest.username));
      formData.append('firmno', authRequest.firmno);
      formData.append('password', encodeURIComponent(authRequest.password));

      const response = await firstValueFrom(
        this.httpService.post(`${baseUrl}/oauth/token`, formData.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'Authorization': `Basic ${basicAuth}`,
          },
        }),
      );

      const authResponse: AuthResponseDto = response.data;
      this.accessToken = authResponse.access_token;
      
      // Token süresi hesapla (saniye cinsinden)
      this.tokenExpiry = new Date(Date.now() + authResponse.expires_in * 1000);

      this.logger.log('Access token başarıyla alındı');
      return this.accessToken;

    } catch (error) {
      this.logger.error('Access token alınırken hata oluştu:', error.message);
      throw new HttpException(
        'Authentication failed',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * Mevcut token'ı döndür (eğer geçerliyse)
   */
  getCurrentToken(): string {
    if (this.isTokenValid()) {
      return this.accessToken;
    }
    return '';
  }

  /**
   * Token'ın geçerli olup olmadığını kontrol et
   */
  isTokenValid(): boolean {
    return this.accessToken && new Date() < this.tokenExpiry;
  }

  /**
   * Token'ı temizle
   */
  clearToken(): void {
    this.accessToken = '';
    this.tokenExpiry = new Date();
  }
}