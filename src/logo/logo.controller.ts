import { Controller, Get, Post, Param, Query, Body, Headers, ParseIntPipe } from '@nestjs/common';
import { LogoService } from './logo.service';
import { LogoQueryDto, PaginatedResult } from '../common/dto/pagination.dto';
import { 
  CreateSalesOrderDto, 
  SalesOrderResponseDto,
  CreateItemDto,
  CreateAccountDto 
} from './dto/sales-order.dto';

/**
 * Logo REST API Controller
 * C# dokümantasyonundaki endpoint'lerin NestJS karşılığı
 */
@Controller('logo')
export class LogoController {
  constructor(private readonly logoService: LogoService) {}

  /**
   * Malzeme Kartları Listesi
   * C# örneği: HttpGet("http://server/api/v1/items", accessToken)
   * 
   * Query parametreleri:
   * - offset: Sayfa başlangıcı (varsayılan: 0)
   * - limit: Sayfa boyutu (varsayılan: 10, max: 100)
   * - search: Arama terimi
   * - filter: Filtreleme
   * - orderBy: Sıralama
   */
  @Get('items')
  async getItems(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.logoService.getItems(query, authHeader);
  }

  /**
   * Tek Malzeme Kartı Okuma
   * C# örneği: HttpGet("http://server/api/v1/items/5", accessToken)
   */
  @Get('items/:id')
  async getItem(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.logoService.getItem(id, authHeader);
  }

  /**
   * Cari Kartları Listesi
   * Logo REST API'de yaygın kullanılan endpoint
   */
  @Get('accounts')
  async getAccounts(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.logoService.getAccounts(query, authHeader);
  }

  /**
   * Tek Cari Kart Okuma
   */
  @Get('accounts/:id')
  async getAccount(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.logoService.getAccount(id, authHeader);
  }

  /**
   * Sipariş Fişleri Listesi
   */
  @Get('orders')
  async getOrders(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.logoService.getOrders(query, authHeader);
  }

  /**
   * Tek Sipariş Fişi Okuma
   */
  @Get('orders/:id')
  async getOrder(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.logoService.getOrder(id, authHeader);
  }

  /**
   * Satın Alma Siparişleri Listesi
   */
  @Get('purchaseOrders')
  async getPurchaseOrders(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.logoService.getPurchaseOrders(query, authHeader);
  }

  /**
   * Tek Satın Alma Siparişi Okuma
   */
  @Get('purchaseOrders/:id')
  async getPurchaseOrder(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.logoService.getPurchaseOrder(id, authHeader);
  }

  /**
   * Fatura Fişleri Listesi
   */
  @Get('invoices')
  async getInvoices(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.logoService.getInvoices(query, authHeader);
  }

  /**
   * Tek Fatura Fişi Okuma
   */
  @Get('invoices/:id')
  async getInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.logoService.getInvoice(id, authHeader);
  }

  /**
   * Genel endpoint - herhangi bir Logo data nesnesini okumak için
   * Örnek: /logo/data/items?offset=10&limit=20
   */
  @Get('data/:endpoint')
  async getData(
    @Param('endpoint') endpoint: string,
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.logoService.getData(endpoint, query, authHeader);
  }

  /**
   * Genel endpoint - tek kayıt okuma
   * Örnek: /logo/data/items/5
   */
  @Get('data/:endpoint/:id')
  async getDataById(
    @Param('endpoint') endpoint: string,
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.logoService.getDataById(endpoint, id, authHeader);
  }

  // ============== POST OPERATIONS - Veri Oluşturma ============== //

  /**
   * Satış Siparişi Oluşturma
   * C# örneği: HttpPost("http://server/api/v1/salesOrders", orderSlip, accessToken)
   */
  @Post('salesOrders')
  async createSalesOrder(
    @Body() createSalesOrderDto: CreateSalesOrderDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<SalesOrderResponseDto> {
    return this.logoService.createSalesOrder(createSalesOrderDto, authHeader);
  }

  /**
   * Malzeme Kartı Oluşturma
   */
  @Post('items')
  async createItem(
    @Body() createItemDto: CreateItemDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.logoService.createItem(createItemDto, authHeader);
  }

  /**
   * Cari Kart Oluşturma
   */
  @Post('accounts')
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.logoService.createAccount(createAccountDto, authHeader);
  }

  /**
   * Sipariş Fişi Oluşturma (alternatif endpoint)
   */
  @Post('orders')
  async createOrder(
    @Body() createSalesOrderDto: CreateSalesOrderDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<SalesOrderResponseDto> {
    return this.logoService.createSalesOrder(createSalesOrderDto, authHeader);
  }

  /**
   * Genel POST endpoint - herhangi bir data nesnesi oluşturmak için
   * Örnek: POST /logo/data/salesOrders
   */
  @Post('data/:endpoint')
  async createData(
    @Param('endpoint') endpoint: string,
    @Body() data: any,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.logoService.createData(endpoint, data, authHeader);
  }

  /**
   * POST sonrası detaylı kayıt okuma
   * C# örneği: HttpGet("http://server/api/v1/salesOrders/735?expandLevel=full", accessToken)
   */
  @Get('salesOrders/:id/full')
  async getSalesOrderFull(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.logoService.getSalesOrderFull(id, authHeader);
  }

  /**
   * Herhangi bir endpoint için expandLevel=full ile okuma
   */
  @Get('data/:endpoint/:id/full')
  async getDataByIdFull(
    @Param('endpoint') endpoint: string,
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.logoService.getDataByIdFull(endpoint, id, authHeader);
  }
}