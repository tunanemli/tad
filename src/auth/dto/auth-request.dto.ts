import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthRequestDto {
  @ApiProperty({ 
    description: 'Logo ERP kullanıcı adı',
    example: 'admin'
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ 
    description: 'Logo ERP şifresi',
    example: 'password123'
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ 
    description: 'Logo ERP firma numarası',
    example: '1'
  })
  @IsString()
  @IsNotEmpty()
  firmno: string;
}