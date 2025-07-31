import { Controller, Get, Post, Param, Query, Body, Headers, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiHeader, ApiBody } from '@nestjs/swagger';
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
@ApiTags('logo')
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
  @ApiOperation({ summary: 'Malzeme kartları listesi', description: 'Logo ERP\'den malzeme kartlarını listeler' })
  @ApiQuery({ name: 'offset', required: false, description: 'Sayfa başlangıcı', example: 0 })
  @ApiQuery({ name: 'limit', required: false, description: 'Sayfa boyutu', example: 10 })
  @ApiQuery({ name: 'search', required: false, description: 'Arama terimi' })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Malzeme kartları başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Tek malzeme kartı getir', description: 'ID ile belirtilen malzeme kartını getirir' })
  @ApiParam({ name: 'id', description: 'Malzeme kartı ID', example: 5 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Malzeme kartı başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Cari kartları listesi', description: 'Logo ERP\'den cari kartları listeler' })
  @ApiQuery({ name: 'offset', required: false, description: 'Sayfa başlangıcı', example: 0 })
  @ApiQuery({ name: 'limit', required: false, description: 'Sayfa boyutu', example: 10 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Cari kartları başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Tek cari kart getir', description: 'ID ile belirtilen cari kartı getirir' })
  @ApiParam({ name: 'id', description: 'Cari kart ID', example: 1 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Cari kart başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Sipariş fişleri listesi', description: 'Logo ERP\'den sipariş fişlerini listeler' })
  @ApiQuery({ name: 'offset', required: false, description: 'Sayfa başlangıcı', example: 0 })
  @ApiQuery({ name: 'limit', required: false, description: 'Sayfa boyutu', example: 10 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Sipariş fişleri başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Tek sipariş fişi getir', description: 'ID ile belirtilen sipariş fişini getirir' })
  @ApiParam({ name: 'id', description: 'Sipariş fişi ID', example: 100 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Sipariş fişi başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Satın alma siparişleri listesi', description: 'Logo ERP\'den satın alma siparişlerini listeler' })
  @ApiQuery({ name: 'offset', required: false, description: 'Sayfa başlangıcı', example: 0 })
  @ApiQuery({ name: 'limit', required: false, description: 'Sayfa boyutu', example: 10 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Satın alma siparişleri başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Tek satın alma siparişi getir', description: 'ID ile belirtilen satın alma siparişini getirir' })
  @ApiParam({ name: 'id', description: 'Satın alma siparişi ID', example: 50 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Satın alma siparişi başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Fatura fişleri listesi', description: 'Logo ERP\'den fatura fişlerini listeler' })
  @ApiQuery({ name: 'offset', required: false, description: 'Sayfa başlangıcı', example: 0 })
  @ApiQuery({ name: 'limit', required: false, description: 'Sayfa boyutu', example: 10 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Fatura fişleri başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Tek fatura fişi getir', description: 'ID ile belirtilen fatura fişini getirir' })
  @ApiParam({ name: 'id', description: 'Fatura fişi ID', example: 200 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Fatura fişi başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Genel data endpoint', description: 'Herhangi bir Logo data nesnesini okumak için' })
  @ApiParam({ name: 'endpoint', description: 'Logo endpoint adı', example: 'items' })
  @ApiQuery({ name: 'offset', required: false, description: 'Sayfa başlangıcı', example: 0 })
  @ApiQuery({ name: 'limit', required: false, description: 'Sayfa boyutu', example: 10 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Data başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Genel tek kayıt endpoint', description: 'Herhangi bir Logo data nesnesinin tek kaydını okumak için' })
  @ApiParam({ name: 'endpoint', description: 'Logo endpoint adı', example: 'items' })
  @ApiParam({ name: 'id', description: 'Kayıt ID', example: 5 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Kayıt başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Satış siparişi oluştur', description: 'Logo ERP\'de yeni satış siparişi oluşturur' })
  @ApiBody({ type: CreateSalesOrderDto })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 201, description: 'Satış siparişi başarıyla oluşturuldu', type: SalesOrderResponseDto })
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
  @ApiOperation({ summary: 'Malzeme kartı oluştur', description: 'Logo ERP\'de yeni malzeme kartı oluşturur' })
  @ApiBody({ type: CreateItemDto })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 201, description: 'Malzeme kartı başarıyla oluşturuldu' })
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
  @ApiOperation({ summary: 'Cari kart oluştur', description: 'Logo ERP\'de yeni cari kart oluşturur' })
  @ApiBody({ type: CreateAccountDto })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 201, description: 'Cari kart başarıyla oluşturuldu' })
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
  @ApiOperation({ summary: 'Sipariş fişi oluştur', description: 'Logo ERP\'de yeni sipariş fişi oluşturur' })
  @ApiBody({ type: CreateSalesOrderDto })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 201, description: 'Sipariş fişi başarıyla oluşturuldu', type: SalesOrderResponseDto })
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
  @ApiOperation({ summary: 'Genel POST endpoint', description: 'Herhangi bir Logo data nesnesi oluşturmak için' })
  @ApiParam({ name: 'endpoint', description: 'Logo endpoint adı', example: 'salesOrders' })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 201, description: 'Data başarıyla oluşturuldu' })
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
  @ApiOperation({ summary: 'Detaylı satış siparişi getir', description: 'expandLevel=full ile detaylı satış siparişi bilgilerini getirir' })
  @ApiParam({ name: 'id', description: 'Satış siparişi ID', example: 735 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Detaylı satış siparişi başarıyla getirildi' })
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
  @ApiOperation({ summary: 'Genel detaylı kayıt getir', description: 'expandLevel=full ile herhangi bir endpoint\'in detaylı bilgilerini getirir' })
  @ApiParam({ name: 'endpoint', description: 'Logo endpoint adı', example: 'items' })
  @ApiParam({ name: 'id', description: 'Kayıt ID', example: 5 })
  @ApiHeader({ name: 'authorization', description: 'Bearer token', required: false })
  @ApiResponse({ status: 200, description: 'Detaylı kayıt başarıyla getirildi' })
  @Get('data/:endpoint/:id/full')
  async getDataByIdFull(
    @Param('endpoint') endpoint: string,
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.logoService.getDataByIdFull(endpoint, id, authHeader);
  }
}