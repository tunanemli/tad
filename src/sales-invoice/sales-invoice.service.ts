import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../common/http-client.service';
import { AuthService } from '../auth/auth.service';
import { LogoQueryDto, PaginatedResult } from '../common/dto/pagination.dto';

@Injectable()
export class SalesInvoiceService {
  private readonly logger = new Logger(SalesInvoiceService.name);
  
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Satış faturaları listesi
   */
  async getSalesInvoices(query: LogoQueryDto, authHeader?: string): Promise<PaginatedResult<any>> {
    const endpoint = 'salesInvoices';
    return this.getDataList(endpoint, query, authHeader);
  }

  /**
   * Tek satış faturası okuma
   */
  async getSalesInvoice(id: number, authHeader?: string): Promise<any> {
    const endpoint = `salesInvoices/${id}`;
    return this.getSingleData(endpoint, authHeader);
  }

  /**
   * Müşteri listesi
   */
  async getCustomers(query: LogoQueryDto, authHeader?: string): Promise<PaginatedResult<any>> {
    const endpoint = 'customers';
    return this.getDataList(endpoint, query, authHeader);
  }

  /**
   * Tek müşteri okuma
   */
  async getCustomer(id: number, authHeader?: string): Promise<any> {
    const endpoint = `customers/${id}`;
    return this.getSingleData(endpoint, authHeader);
  }

  /**
   * Satış siparişleri listesi
   */
  async getSalesOrders(query: LogoQueryDto, authHeader?: string): Promise<PaginatedResult<any>> {
    const endpoint = 'salesOrders';
    return this.getDataList(endpoint, query, authHeader);
  }

  /**
   * Tek satış siparişi okuma
   */
  async getSalesOrder(id: number, authHeader?: string): Promise<any> {
    const endpoint = `salesOrders/${id}`;
    return this.getSingleData(endpoint, authHeader);
  }

  /**
   * Genel data listesi okuma
   */
  async getData(endpoint: string, query: LogoQueryDto, authHeader?: string): Promise<PaginatedResult<any>> {
    return this.getDataList(endpoint, query, authHeader);
  }

  /**
   * Genel tek data okuma
   */
  async getDataById(endpoint: string, id: number, authHeader?: string): Promise<any> {
    const fullEndpoint = `${endpoint}/${id}`;
    return this.getSingleData(fullEndpoint, authHeader);
  }

  /**
   * Satış faturası oluşturma
   */
  async createSalesInvoice(createSalesInvoiceDto: any, authHeader?: string): Promise<any> {
    return this.createDataGeneric('salesInvoices', createSalesInvoiceDto, authHeader);
  }

  /**
   * Müşteri oluşturma
   */
  async createCustomer(createCustomerDto: any, authHeader?: string): Promise<any> {
    return this.createDataGeneric('customers', createCustomerDto, authHeader);
  }

  /**
   * Satış siparişi oluşturma
   */
  async createSalesOrder(createSalesOrderDto: any, authHeader?: string): Promise<any> {
    return this.createDataGeneric('salesOrders', createSalesOrderDto, authHeader);
  }

  /**
   * Genel veri oluşturma
   */
  async createData(endpoint: string, data: any, authHeader?: string): Promise<any> {
    return this.createDataGeneric(endpoint, data, authHeader);
  }

  /**
   * POST sonrası detaylı fatura okuma - expandLevel=full ile
   */
  async getSalesInvoiceFull(id: number, authHeader?: string): Promise<any> {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      throw new HttpException('Authorization token gerekli', HttpStatus.UNAUTHORIZED);
    }

    try {
      const baseUrl = this.getSalesInvoiceApiUrl();
      const endpoint = `${baseUrl}/api/v1/salesInvoices/${id}?expandLevel=full`;

      this.logger.log(`GET ${endpoint} - Detaylı satış faturası okunuyor`);

      return await this.httpClientService.httpGet(endpoint, token);

    } catch (error) {
      this.logger.error(`Detaylı satış faturası okuma hatası (ID: ${id}):`, error.message);
      throw new HttpException(
        `Detaylı satış faturası okunamadı: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Herhangi bir endpoint için expandLevel=full ile okuma
   */
  async getDataByIdFull(endpoint: string, id: number, authHeader?: string): Promise<any> {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      throw new HttpException('Authorization token gerekli', HttpStatus.UNAUTHORIZED);
    }

    try {
      const baseUrl = this.getSalesInvoiceApiUrl();
      const fullUrl = `${baseUrl}/api/v1/${endpoint}/${id}?expandLevel=full`;

      this.logger.log(`GET ${fullUrl} - Detaylı veri okunuyor`);

      return await this.httpClientService.httpGet(fullUrl, token);

    } catch (error) {
      this.logger.error(`Detaylı veri okuma hatası (${endpoint}/${id}):`, error.message);
      throw new HttpException(
        `Detaylı veri okunamadı: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Private method - Liste verisi okuma (pagination ile)
   */
  private async getDataList(
    endpoint: string, 
    query: LogoQueryDto, 
    authHeader?: string
  ): Promise<PaginatedResult<any>> {
    const token = this.authService.getCurrentToken();
    
    if (!token) {
      throw new HttpException('Authorization token gerekli', HttpStatus.UNAUTHORIZED);
    }

    try {
      const baseUrl = this.getSalesInvoiceApiUrl();
      const queryParams = this.buildQueryParams(query);
      const fullUrl = `${baseUrl}/api/v1/${endpoint}${queryParams}`;

      this.logger.log(`GET ${fullUrl}`);

      const result = await this.httpClientService.httpGet(fullUrl, token);

      // API'den gelen veriyi pagination formatına dönüştür
      return this.formatPaginatedResult(result, query);

    } catch (error) {
      this.logger.error(`GET ${endpoint} listesi hatası:`, error.message);
      throw new HttpException(
        `${endpoint} listesi alınamadı: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Private method - Tek kayıt okuma
   */
  private async getSingleData(endpoint: string, authHeader: string): Promise<any> {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      throw new HttpException('Authorization token gerekli', HttpStatus.UNAUTHORIZED);
    }

    try {
      const baseUrl = this.getSalesInvoiceApiUrl();
      const fullUrl = `${baseUrl}/api/v1/${endpoint}`;

      this.logger.log(`GET ${fullUrl}`);

      return await this.httpClientService.httpGet(fullUrl, token);

    } catch (error) {
      this.logger.error(`GET ${endpoint} hatası:`, error.message);
      throw new HttpException(
        `${endpoint} verisi alınamadı: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Private method - Genel POST işlemi
   */
  private async createDataGeneric(endpoint: string, data: any, authHeader: string): Promise<any> {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      throw new HttpException('Authorization token gerekli', HttpStatus.UNAUTHORIZED);
    }

    try {
      const baseUrl = this.getSalesInvoiceApiUrl();
      const fullUrl = `${baseUrl}/api/v1/${endpoint}`;

      // Özel değerleri işle
      const processedData = this.processSpecialValues(data);

      this.logger.log(`POST ${fullUrl} - ${endpoint} oluşturuluyor`);

      const result = await this.httpClientService.httpPost(fullUrl, processedData, token);

      if (result.INTERNAL_REFERENCE) {
        this.logger.log(`${endpoint} oluşturuldu - ID: ${result.INTERNAL_REFERENCE}`);
      }

      return result;

    } catch (error) {
      this.logger.error(`${endpoint} oluşturma hatası:`, error.message);
      throw new HttpException(
        `${endpoint} oluşturulamadı: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Query parametrelerini URL string'e dönüştür
   */
  private buildQueryParams(query: LogoQueryDto): string {
    const params = new URLSearchParams();

    if (query.offset !== undefined) {
      params.append('offset', query.offset.toString());
    }

    if (query.limit !== undefined) {
      params.append('limit', query.limit.toString());
    }

    if (query.search) {
      params.append('search', query.search);
    }

    if (query.filter) {
      params.append('filter', query.filter);
    }

    if (query.orderBy) {
      params.append('orderBy', query.orderBy);
    }

    if (query.fields) {
      params.append('fields', query.fields);
    }

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * API sonucunu standart pagination formatına dönüştür
   * Logo API response formatına göre düzenlendi
   */
  private formatPaginatedResult(result: any, query: LogoQueryDto): PaginatedResult<any> {
    // Logo API response formatı: { Meta, offset, count, limit, items, first, next, previous }
    const data = result.items || [];
    const hasNext = !!result.next && result.next.href;
    const hasPrev = !!result.previous && result.previous.href;
    
    return {
      data,
      meta: {
        offset: result.offset || query.offset || 0,
        limit: result.limit || query.limit || 10,
        total: result.count || data.length,
        hasNext,
        hasPrev,
        // Logo API'den gelen ek bilgiler
        apiMeta: result.Meta,
        first: result.first,
        next: result.next,
        previous: result.previous,
      },
    };
  }

  /**
   * Authorization header'dan token çıkar
   */
  private extractToken(authHeader: string): string {
    if (!authHeader) return '';
    
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }
    
    return '';
  }

  /**
   * Özel değerleri işle (NUMBER = "~" gibi)
   */
  private processSpecialValues(data: any): any {
    const processedData = JSON.parse(JSON.stringify(data)); // Deep clone

    // NUMBER = "~" otomatik numaralama için
    if (processedData.NUMBER === '~') {
      this.logger.log('Otomatik numaralama kullanılıyor (NUMBER = "~")');
    }

    // DATE formatını kontrol et
    if (processedData.DATE) {
      processedData.DATE = this.formatDateForApi(processedData.DATE);
    }

    // TIME değeri yoksa current time kullan
    if (!processedData.TIME) {
      processedData.TIME = this.getCurrentTime();
    }

    return processedData;
  }

  /**
   * Date'i API formatına çevir
   */
  private formatDateForApi(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
  }

  /**
   * TIME formatında current time
   */
  private getCurrentTime(): number {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    return hours * 10000 + minutes * 100 + seconds;
  }

  /**
   * Satış faturaları API URL'ini döndür
   */
  private getSalesInvoiceApiUrl(): string {
    return this.configService.get<string>('salesInvoiceApiUrl');
  }
} 