import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRequestDto, AuthResponseDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Token alma endpoint'i
   * C# kodundaki getAccessToken metodunun HTTP endpoint karşılığı
   */
  @Post('token')
  async getToken(@Body() authRequest: AuthRequestDto): Promise<AuthResponseDto> {
    const accessToken = await this.authService.getAccessToken(authRequest);
    
    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: 3600, // 1 saat (değer API'den gelecek)
    };
  }

  /**
   * Mevcut token durumunu kontrol et
   */
  @Get('status')
  getTokenStatus(): any {
    const isValid = this.authService.isTokenValid();
    const currentToken = this.authService.getCurrentToken();
    
    return {
      isValid,
      hasToken: !!currentToken,
      message: isValid ? 'Token geçerli' : 'Token geçersiz veya süresi dolmuş',
    };
  }

  /**
   * Token'ı temizle (logout)
   */
  @Post('logout')
  logout(): any {
    this.authService.clearToken();
    return {
      message: 'Token başarıyla temizlendi',
    };
  }
}