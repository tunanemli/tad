import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty({ 
    description: 'Sayfa başlangıcı',
    example: 0,
    required: false,
    minimum: 0
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  offset?: number = 0;

  @ApiProperty({ 
    description: 'Sayfa boyutu',
    example: 10,
    required: false,
    minimum: 1,
    maximum: 100
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

export class LogoQueryDto extends PaginationDto {
  @ApiProperty({ 
    description: 'Arama terimi',
    example: 'test',
    required: false
  })
  @IsOptional()
  search?: string;

  @ApiProperty({ 
    description: 'Filtreleme kriteri',
    example: 'ACTIVE=1',
    required: false
  })
  @IsOptional()
  filter?: string;

  @ApiProperty({ 
    description: 'Sıralama kriteri',
    example: 'CODE ASC',
    required: false
  })
  @IsOptional()
  orderBy?: string;

  @ApiProperty({ 
    description: 'Döndürülecek alanlar',
    example: 'CODE,NAME,DEFINITION_',
    required: false
  })
  @IsOptional()
  fields?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    offset: number;
    limit: number;
    total?: number;
    hasNext: boolean;
    hasPrev: boolean;
    // Logo API'den gelen ek bilgiler
    apiMeta?: any;
    first?: any;
    next?: any;
    previous?: any;
  };
}