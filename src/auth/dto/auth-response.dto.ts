import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ 
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  access_token: string;

  @ApiProperty({ 
    description: 'Token tipi',
    example: 'Bearer'
  })
  token_type: string;

  @ApiProperty({ 
    description: 'Token geçerlilik süresi (saniye)',
    example: 3600
  })
  expires_in: number;

  @ApiProperty({ 
    description: 'Refresh token (opsiyonel)',
    example: 'refresh_token_here',
    required: false
  })
  refresh_token?: string;
}