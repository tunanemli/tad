import { Controller, Get, Post, Body, Param, Query, Headers, ParseIntPipe } from '@nestjs/common';
import { PurchaseInvoiceService } from './purchase-invoice.service';
import { LogoQueryDto } from '../common/dto/pagination.dto';

@Controller('purchase-invoice')
export class PurchaseInvoiceController {
  constructor(private readonly purchaseInvoiceService: PurchaseInvoiceService) {}

  // === SATIN ALMA FATURALARI ===
  
  @Get('invoices')
  async getPurchaseInvoices(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.getPurchaseInvoices(query, authHeader);
  }

  @Get('invoices/:id')
  async getPurchaseInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.getPurchaseInvoice(id, authHeader);
  }

  @Get('invoices/:id/full')
  async getPurchaseInvoiceFull(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.getPurchaseInvoiceFull(id, authHeader);
  }

  @Post('invoices')
  async createPurchaseInvoice(
    @Body() createPurchaseInvoiceDto: any,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.createPurchaseInvoice(createPurchaseInvoiceDto, authHeader);
  }

  // === TEDARİKÇİLER ===
  
  @Get('suppliers')
  async getSuppliers(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.getSuppliers(query, authHeader);
  }

  @Get('suppliers/:id')
  async getSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.getSupplier(id, authHeader);
  }

  @Post('suppliers')
  async createSupplier(
    @Body() createSupplierDto: any,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.createSupplier(createSupplierDto, authHeader);
  }

  // === SATIN ALMA SİPARİŞLERİ ===
  
  @Get('orders')
  async getPurchaseOrders(
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.getPurchaseOrders(query, authHeader);
  }

  @Get('orders/:id')
  async getPurchaseOrder(
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.getPurchaseOrder(id, authHeader);
  }

  @Post('orders')
  async createPurchaseOrder(
    @Body() createPurchaseOrderDto: any,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.createPurchaseOrder(createPurchaseOrderDto, authHeader);
  }

  // === GENEL DATA ENDPOINTS ===
  
  @Get('data/:endpoint')
  async getData(
    @Param('endpoint') endpoint: string,
    @Query() query: LogoQueryDto,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.getData(endpoint, query, authHeader);
  }

  @Get('data/:endpoint/:id')
  async getDataById(
    @Param('endpoint') endpoint: string,
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.getDataById(endpoint, id, authHeader);
  }

  @Get('data/:endpoint/:id/full')
  async getDataByIdFull(
    @Param('endpoint') endpoint: string,
    @Param('id', ParseIntPipe) id: number,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.getDataByIdFull(endpoint, id, authHeader);
  }

  @Post('data/:endpoint')
  async createData(
    @Param('endpoint') endpoint: string,
    @Body() data: any,
    @Headers('authorization') authHeader?: string,
  ) {
    return this.purchaseInvoiceService.createData(endpoint, data, authHeader);
  }
} 