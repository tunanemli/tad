import { Type } from 'class-transformer';
import { 
  IsString, 
  IsNumber, 
  IsOptional, 
  IsArray, 
  ValidateNested, 
  IsDateString,
  Min,
  Max 
} from 'class-validator';

/**
 * Sipariş satırı DTO - C# dokümantasyonundaki TRANSACTIONS.items yapısı
 */
export class SalesOrderTransactionDto {
  @IsNumber()
  @IsOptional()
  TYPE?: number = 0;

  @IsString()
  MASTER_CODE: string;

  @IsNumber()
  @Min(0)
  QUANTITY: number;

  @IsNumber()
  @Min(0)
  PRICE: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  VAT_RATE: number;

  @IsString()
  UNIT_CODE: string;

  @IsNumber()
  @IsOptional()
  UNIT_CONV1?: number = 1;

  @IsNumber()
  @IsOptional()
  UNIT_CONV2?: number = 1;

  @IsNumber()
  @IsOptional()
  EDT_CURR?: number = 1;

  @IsNumber()
  @IsOptional()
  INTERNAL_REFERENCE?: number;
}

/**
 * Sipariş TRANSACTIONS DTO - nested yapı
 */
export class SalesOrderTransactionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalesOrderTransactionDto)
  items: SalesOrderTransactionDto[];
}

/**
 * Ana sipariş fişi DTO - C# dokümantasyonundaki örnek
 */
export class CreateSalesOrderDto {
  @IsNumber()
  @IsOptional()
  INTERNAL_REFERENCE?: number = 0;

  @IsString()
  @IsOptional()
  NUMBER?: string = '~'; // Otomatik numaralama için ~

  @IsDateString()
  DATE: string; // "02.05.2016" formatı

  @IsNumber()
  @IsOptional()
  TIME?: number;

  @IsString()
  ARP_CODE: string; // Cari kod

  @IsNumber()
  @IsOptional()
  CURRSEL_TOTAL?: number = 1;

  @ValidateNested()
  @Type(() => SalesOrderTransactionsDto)
  TRANSACTIONS: SalesOrderTransactionsDto;

  // Opsiyonel alanlar - POST işlemi sırasında sistem tarafından doldurulabilir
  @IsNumber()
  @IsOptional()
  CLIENTREF?: number;

  @IsNumber()
  @IsOptional()
  TYPE?: number;

  @IsNumber()
  @IsOptional()
  ORDER_STATUS?: number;
}

/**
 * POST Response DTO - sistem tarafından doldurulmuş hali
 */
export class SalesOrderResponseDto {
  INTERNAL_REFERENCE: number;
  NUMBER: string;
  DATE: string;
  TIME: number;
  ARP_CODE: string;
  CURRSEL_TOTAL: number;
  TRANSACTIONS: {
    items: Array<{
      INTERNAL_REFERENCE: number | null;
      TYPE: number;
      MASTER_CODE: string;
      QUANTITY: number;
      PRICE: number;
      VAT_RATE: number;
      UNIT_CODE: string;
      UNIT_CONV1: number;
      UNIT_CONV2: number;
      EDT_CURR: number;
    }>;
  };
}

/**
 * Basit malzeme kartı DTO
 */
export class CreateItemDto {
  @IsString()
  CODE: string;

  @IsString()
  NAME: string;

  @IsString()
  @IsOptional()
  SPECODE?: string;

  @IsNumber()
  @IsOptional()
  CARDTYPE?: number = 1;

  @IsString()
  @IsOptional()
  UNIT_CODE?: string = 'ADET';

  @IsNumber()
  @IsOptional()
  VAT_RATE?: number = 18;
}

/**
 * Basit cari kart DTO
 */
export class CreateAccountDto {
  @IsString()
  CODE: string;

  @IsString()
  DEFINITION_: string; // Cari tanımı

  @IsNumber()
  @IsOptional()
  CARDTYPE?: number = 0; // 0: Müşteri, 1: Satıcı

  @IsString()
  @IsOptional()
  SPECODE?: string;

  @IsString()
  @IsOptional()
  CITY?: string;

  @IsString()
  @IsOptional()
  COUNTRY?: string;
}