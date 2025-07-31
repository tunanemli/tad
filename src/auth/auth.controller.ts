import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthRequestDto, AuthResponseDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Token alma endpoint'i
   * C# kodundaki getAccessToken metodunun HTTP endpoint karşılığı
   */
  @ApiOperation({ summary: 'Logo API token al', description: 'Logo ERP sistemine erişim için access token alır' })
  @ApiBody({ type: AuthRequestDto })
  @ApiResponse({ status: 200, description: 'Token başarıyla alındı', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Kimlik doğrulama başarısız' })
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
  @ApiOperation({ summary: 'Token durumunu kontrol et', description: 'Mevcut token\'ın geçerliliğini kontrol eder' })
  @ApiResponse({ status: 200, description: 'Token durumu başarıyla kontrol edildi' })
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
  @ApiOperation({ summary: 'Çıkış yap', description: 'Mevcut token\'ı temizler ve çıkış yapar' })
  @ApiResponse({ status: 200, description: 'Başarıyla çıkış yapıldı' })
  @Post('logout')
  logout(): any {
    this.authService.clearToken();
    return {
      message: 'Token başarıyla temizlendi',
    };
  }
}