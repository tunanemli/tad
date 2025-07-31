import { Controller, Get, Post, Param, Query, Body, Headers, ParseIntPipe } from '@nestjs/common';
import { SalesInvoiceService } from './sales-invoice.service';
import { LogoQueryDto, PaginatedResult } from '../common/dto/pagination.dto';

/**
 * Satış Faturaları REST API Controller
 * Satış faturaları işlemleri için özel endpoint'ler
 */
@Controller('sales-invoice')
export class SalesInvoiceController {
  constructor(private readonly salesInvoiceService: SalesInvoiceService) {}

  /**
   * Satış Faturaları Listesi
   */
  @Get('invoices')
  async getSalesInvoices(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader: string,
  ): Promise<PaginatedResult<any>> {
    return this.salesInvoiceService.getSalesInvoices(query, authHeader);
  }

  /**
   * Tek Satış Faturası Okuma
   */
  @Get('invoices/:id')
  async getSalesInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.salesInvoiceService.getSalesInvoice(id, authHeader);
  }

  /**
   * Müşteri Listesi
   */
  @Get('customers')
  async getCustomers(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.salesInvoiceService.getCustomers(query, authHeader);
  }

  /**
   * Tek Müşteri Okuma
   */
  @Get('customers/:id')
  async getCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.salesInvoiceService.getCustomer(id, authHeader);
  }

  /**
   * Satış Siparişleri Listesi
   */
  @Get('orders')
  async getSalesOrders(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.salesInvoiceService.getSalesOrders(query, authHeader);
  }

  /**
   * Tek Satış Siparişi Okuma
   */
  @Get('orders/:id')
  async getSalesOrder(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.salesInvoiceService.getSalesOrder(id, authHeader);
  }

  /**
   * Genel endpoint - herhangi bir satış faturası data nesnesini okumak için
   * Örnek: /sales-invoice/data/salesInvoices?offset=10&limit=20
   */
  @Get('data/:endpoint')
  async getData(
    @Param('endpoint') endpoint: string,
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.salesInvoiceService.getData(endpoint, query, authHeader);
  }

  /**
   * Genel endpoint - tek kayıt okuma
   * Örnek: /sales-invoice/data/salesInvoices/5
   */
  @Get('data/:endpoint/:id')
  async getDataById(
    @Param('endpoint') endpoint: string,
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.salesInvoiceService.getDataById(endpoint, id, authHeader);
  }

  // ============== POST OPERATIONS - Veri Oluşturma ============== //

  /**
   * Satış Faturası Oluşturma
   */
  @Post('invoices')
  async createSalesInvoice(
    @Body() createSalesInvoiceDto: any,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.salesInvoiceService.createSalesInvoice(createSalesInvoiceDto, authHeader);
  }

  /**
   * Müşteri Oluşturma
   */
  @Post('customers')
  async createCustomer(
    @Body() createCustomerDto: any,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.salesInvoiceService.createCustomer(createCustomerDto, authHeader);
  }

  /**
   * Satış Siparişi Oluşturma
   */
  @Post('orders')
  async createSalesOrder(
    @Body() createSalesOrderDto: any,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.salesInvoiceService.createSalesOrder(createSalesOrderDto, authHeader);
  }

  /**
   * Genel POST endpoint - herhangi bir satış faturası data nesnesi oluşturmak için
   * Örnek: POST /sales-invoice/data/salesInvoices
   */
  @Post('data/:endpoint')
  async createData(
    @Param('endpoint') endpoint: string,
    @Body() data: any,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.salesInvoiceService.createData(endpoint, data, authHeader);
  }

  /**
   * POST sonrası detaylı kayıt okuma
   */
  @Get('invoices/:id/full')
  async getSalesInvoiceFull(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.salesInvoiceService.getSalesInvoiceFull(id, authHeader);
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
    return this.salesInvoiceService.getDataByIdFull(endpoint, id, authHeader);
  }
} 