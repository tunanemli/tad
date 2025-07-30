import { IsString, IsNotEmpty } from 'class-validator';

export class AuthRequestDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firmno: string;
}