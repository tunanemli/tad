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
import { ApiProperty } from '@nestjs/swagger';

/**
 * Sipariş satırı DTO - C# dokümantasyonundaki TRANSACTIONS.items yapısı
 */
export class SalesOrderTransactionDto {
  @ApiProperty({ 
    description: 'Satır tipi',
    example: 0,
    required: false
  })
  @IsNumber()
  @IsOptional()
  TYPE?: number = 0;

  @ApiProperty({ 
    description: 'Malzeme kodu',
    example: 'MALZ001'
  })
  @IsString()
  MASTER_CODE: string;

  @ApiProperty({ 
    description: 'Miktar',
    example: 10,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  QUANTITY: number;

  @ApiProperty({ 
    description: 'Birim fiyat',
    example: 100.50,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  PRICE: number;

  @ApiProperty({ 
    description: 'KDV oranı (%)',
    example: 18,
    minimum: 0,
    maximum: 100
  })
  @IsNumber()
  @Min(0)
  @Max(100)
  VAT_RATE: number;

  @ApiProperty({ 
    description: 'Birim kodu',
    example: 'ADET'
  })
  @IsString()
  UNIT_CODE: string;

  @ApiProperty({ 
    description: 'Birim çevrim faktörü 1',
    example: 1,
    required: false
  })
  @IsNumber()
  @IsOptional()
  UNIT_CONV1?: number = 1;

  @ApiProperty({ 
    description: 'Birim çevrim faktörü 2',
    example: 1,
    required: false
  })
  @IsNumber()
  @IsOptional()
  UNIT_CONV2?: number = 1;

  @ApiProperty({ 
    description: 'Döviz kuru',
    example: 1,
    required: false
  })
  @IsNumber()
  @IsOptional()
  EDT_CURR?: number = 1;

  @ApiProperty({ 
    description: 'İç referans numarası',
    example: 12345,
    required: false
  })
  @IsNumber()
  @IsOptional()
  INTERNAL_REFERENCE?: number;
}

/**
 * Sipariş TRANSACTIONS DTO - nested yapı
 */
export class SalesOrderTransactionsDto {
  @ApiProperty({ 
    description: 'Sipariş satırları',
    type: [SalesOrderTransactionDto]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalesOrderTransactionDto)
  items: SalesOrderTransactionDto[];
}

/**
 * Ana sipariş fişi DTO - C# dokümantasyonundaki örnek
 */
export class CreateSalesOrderDto {
  @ApiProperty({ 
    description: 'İç referans numarası',
    example: 0,
    required: false
  })
  @IsNumber()
  @IsOptional()
  INTERNAL_REFERENCE?: number = 0;

  @ApiProperty({ 
    description: 'Sipariş numarası (otomatik için ~)',
    example: '~',
    required: false
  })
  @IsString()
  @IsOptional()
  NUMBER?: string = '~'; // Otomatik numaralama için ~

  @ApiProperty({ 
    description: 'Sipariş tarihi (DD.MM.YYYY formatı)',
    example: '02.05.2016'
  })
  @IsDateString()
  DATE: string; // "02.05.2016" formatı

  @ApiProperty({ 
    description: 'Saat',
    example: 1430,
    required: false
  })
  @IsNumber()
  @IsOptional()
  TIME?: number;

  @ApiProperty({ 
    description: 'Cari kod',
    example: 'CARI001'
  })
  @IsString()
  ARP_CODE: string; // Cari kod

  @ApiProperty({ 
    description: 'Döviz seçimi',
    example: 1,
    required: false
  })
  @IsNumber()
  @IsOptional()
  CURRSEL_TOTAL?: number = 1;

  @ApiProperty({ 
    description: 'Sipariş satırları',
    type: SalesOrderTransactionsDto
  })
  @ValidateNested()
  @Type(() => SalesOrderTransactionsDto)
  TRANSACTIONS: SalesOrderTransactionsDto;

  // Opsiyonel alanlar - POST işlemi sırasında sistem tarafından doldurulabilir
  @ApiProperty({ 
    description: 'Müşteri referansı',
    example: 123,
    required: false
  })
  @IsNumber()
  @IsOptional()
  CLIENTREF?: number;

  @ApiProperty({ 
    description: 'Sipariş tipi',
    example: 0,
    required: false
  })
  @IsNumber()
  @IsOptional()
  TYPE?: number;

  @ApiProperty({ 
    description: 'Sipariş durumu',
    example: 0,
    required: false
  })
  @IsNumber()
  @IsOptional()
  ORDER_STATUS?: number;
}

/**
 * POST Response DTO - sistem tarafından doldurulmuş hali
 */
export class SalesOrderResponseDto {
  @ApiProperty({ 
    description: 'İç referans numarası',
    example: 735
  })
  INTERNAL_REFERENCE: number;

  @ApiProperty({ 
    description: 'Sipariş numarası',
    example: 'SIP001'
  })
  NUMBER: string;

  @ApiProperty({ 
    description: 'Sipariş tarihi',
    example: '02.05.2016'
  })
  DATE: string;

  @ApiProperty({ 
    description: 'Saat',
    example: 1430
  })
  TIME: number;

  @ApiProperty({ 
    description: 'Cari kod',
    example: 'CARI001'
  })
  ARP_CODE: string;

  @ApiProperty({ 
    description: 'Döviz seçimi',
    example: 1
  })
  CURRSEL_TOTAL: number;

  @ApiProperty({ 
    description: 'Sipariş satırları'
  })
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
  @ApiProperty({ 
    description: 'Malzeme kodu',
    example: 'MALZ001'
  })
  @IsString()
  CODE: string;

  @ApiProperty({ 
    description: 'Malzeme adı',
    example: 'Test Malzemesi'
  })
  @IsString()
  NAME: string;

  @ApiProperty({ 
    description: 'Özel kod',
    example: 'OZEL001',
    required: false
  })
  @IsString()
  @IsOptional()
  SPECODE?: string;

  @ApiProperty({ 
    description: 'Kart tipi',
    example: 1,
    required: false
  })
  @IsNumber()
  @IsOptional()
  CARDTYPE?: number = 1;

  @ApiProperty({ 
    description: 'Birim kodu',
    example: 'ADET',
    required: false
  })
  @IsString()
  @IsOptional()
  UNIT_CODE?: string = 'ADET';

  @ApiProperty({ 
    description: 'KDV oranı (%)',
    example: 18,
    required: false
  })
  @IsNumber()
  @IsOptional()
  VAT_RATE?: number = 18;
}

/**
 * Basit cari kart DTO
 */
export class CreateAccountDto {
  @ApiProperty({ 
    description: 'Cari kod',
    example: 'CARI001'
  })
  @IsString()
  CODE: string;

  @ApiProperty({ 
    description: 'Cari tanımı',
    example: 'Test Müşterisi A.Ş.'
  })
  @IsString()
  DEFINITION_: string; // Cari tanımı

  @ApiProperty({ 
    description: 'Kart tipi (0: Müşteri, 1: Satıcı)',
    example: 0,
    required: false
  })
  @IsNumber()
  @IsOptional()
  CARDTYPE?: number = 0; // 0: Müşteri, 1: Satıcı

  @ApiProperty({ 
    description: 'Özel kod',
    example: 'OZEL001',
    required: false
  })
  @IsString()
  @IsOptional()
  SPECODE?: string;

  @ApiProperty({ 
    description: 'Şehir',
    example: 'İstanbul',
    required: false
  })
  @IsString()
  @IsOptional()
  CITY?: string;

  @ApiProperty({ 
    description: 'Ülke',
    example: 'Türkiye',
    required: false
  })
  @IsString()
  @IsOptional()
  COUNTRY?: string;
}