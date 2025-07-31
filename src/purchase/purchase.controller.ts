import { Controller, Get, Post, Param, Query, Body, Headers, ParseIntPipe } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { LogoQueryDto, PaginatedResult } from '../common/dto/pagination.dto';

/**
 * Satın Alma REST API Controller
 * Satın alma işlemleri için özel endpoint'ler
 */
@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  /**
   * Satın Alma Siparişleri Listesi
   */
  @Get('orders')
  async getPurchaseOrders(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.purchaseService.getPurchaseOrders(query, authHeader);
  }

  /**
   * Tek Satın Alma Siparişi Okuma
   */
  @Get('orders/:id')
  async getPurchaseOrder(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.purchaseService.getPurchaseOrder(id, authHeader);
  }

  /**
   * Satın Alma Faturaları Listesi
   */
  @Get('invoices')
  async getPurchaseInvoices(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.purchaseService.getPurchaseInvoices(query, authHeader);
  }

  /**
   * Tek Satın Alma Faturası Okuma
   */
  @Get('invoices/:id')
  async getPurchaseInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.purchaseService.getPurchaseInvoice(id, authHeader);
  }

  /**
   * Tedarikçi Listesi
   */
  @Get('suppliers')
  async getSuppliers(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.purchaseService.getSuppliers(query, authHeader);
  }

  /**
   * Tek Tedarikçi Okuma
   */
  @Get('suppliers/:id')
  async getSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.purchaseService.getSupplier(id, authHeader);
  }

  /**
   * Genel endpoint - herhangi bir satın alma data nesnesini okumak için
   * Örnek: /purchase/data/purchaseOrders?offset=10&limit=20
   */
  @Get('data/:endpoint')
  async getData(
    @Param('endpoint') endpoint: string,
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ): Promise<PaginatedResult<any>> {
    return this.purchaseService.getData(endpoint, query, authHeader);
  }

  /**
   * Genel endpoint - tek kayıt okuma
   * Örnek: /purchase/data/purchaseOrders/5
   */
  @Get('data/:endpoint/:id')
  async getDataById(
    @Param('endpoint') endpoint: string,
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.purchaseService.getDataById(endpoint, id, authHeader);
  }

  // ============== POST OPERATIONS - Veri Oluşturma ============== //

  /**
   * Satın Alma Siparişi Oluşturma
   */
  @Post('orders')
  async createPurchaseOrder(
    @Body() createPurchaseOrderDto: any,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.purchaseService.createPurchaseOrder(createPurchaseOrderDto, authHeader);
  }

  /**
   * Tedarikçi Oluşturma
   */
  @Post('suppliers')
  async createSupplier(
    @Body() createSupplierDto: any,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.purchaseService.createSupplier(createSupplierDto, authHeader);
  }

  /**
   * Genel POST endpoint - herhangi bir satın alma data nesnesi oluşturmak için
   * Örnek: POST /purchase/data/purchaseOrders
   */
  @Post('data/:endpoint')
  async createData(
    @Param('endpoint') endpoint: string,
    @Body() data: any,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.purchaseService.createData(endpoint, data, authHeader);
  }

  /**
   * POST sonrası detaylı kayıt okuma
   */
  @Get('orders/:id/full')
  async getPurchaseOrderFull(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ): Promise<any> {
    return this.purchaseService.getPurchaseOrderFull(id, authHeader);
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
    return this.purchaseService.getDataByIdFull(endpoint, id, authHeader);
  }
} 