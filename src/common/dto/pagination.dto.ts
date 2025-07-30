import { IsOptional, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  offset?: number = 0;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;
}

export class LogoQueryDto extends PaginationDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  filter?: string;

  @IsOptional()
  orderBy?: string;

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
  };
}