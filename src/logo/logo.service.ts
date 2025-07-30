import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClientService } from '../common/http-client.service';
import { AuthService } from '../auth/auth.service';
import { LogoQueryDto, PaginatedResult } from '../common/dto/pagination.dto';
import { 
  CreateSalesOrderDto, 
  SalesOrderResponseDto,
  CreateItemDto,
  CreateAccountDto 
} from './dto/sales-order.dto';

@Injectable()
export class LogoService {
  private readonly logger = new Logger(LogoService.name);
  
  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Malzeme kartları listesi - C# dokümantasyonundaki örnek
   */
  async getItems(query: LogoQueryDto, authHeader?: string): Promise<PaginatedResult<any>> {
    const endpoint = 'items';
    return this.getDataList(endpoint, query, authHeader);
  }

  /**
   * Tek malzeme kartı okuma
   */
  async getItem(id: number, authHeader?: string): Promise<any> {
    const endpoint = `items/${id}`;
    return this.getSingleData(endpoint, authHeader);
  }

  /**
   * Cari kartları listesi
   */
  async getAccounts(query: LogoQueryDto, authHeader?: string): Promise<PaginatedResult<any>> {
    const endpoint = 'accounts';
    return this.getDataList(endpoint, query, authHeader);
  }

  /**
   * Tek cari kart okuma
   */
  async getAccount(id: number, authHeader?: string): Promise<any> {
    const endpoint = `accounts/${id}`;
    return this.getSingleData(endpoint, authHeader);
  }

  /**
   * Sipariş fişleri listesi
   */
  async getOrders(query: LogoQueryDto, authHeader?: string): Promise<PaginatedResult<any>> {
    const endpoint = 'orders';
    return this.getDataList(endpoint, query, authHeader);
  }

  /**
   * Tek sipariş fişi okuma
   */
  async getOrder(id: number, authHeader?: string): Promise<any> {
    const endpoint = `orders/${id}`;
    return this.getSingleData(endpoint, authHeader);
  }

  /**
   * Fatura fişleri listesi
   */
  async getInvoices(query: LogoQueryDto, authHeader?: string): Promise<PaginatedResult<any>> {
    const endpoint = 'invoices';
    return this.getDataList(endpoint, query, authHeader);
  }

  /**
   * Tek fatura fişi okuma
   */
  async getInvoice(id: number, authHeader?: string): Promise<any> {
    const endpoint = `invoices/${id}`;
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
   * Private method - Liste verisi okuma (pagination ile)
   */
  private async getDataList(
    endpoint: string, 
    query: LogoQueryDto, 
    authHeader?: string
  ): Promise<PaginatedResult<any>> {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      throw new HttpException('Authorization token gerekli', HttpStatus.UNAUTHORIZED);
    }

    try {
      const baseUrl = this.getLogoApiUrl();
      const queryParams = this.buildQueryParams(query);
      const fullUrl = `${baseUrl}/api/v1/${endpoint}${queryParams}`;

      this.logger.log(`GET ${fullUrl}`);

      const result = await this.httpClientService.httpGet(fullUrl, token);

      // Logo REST API'den gelen veriyi pagination formatına dönüştür
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
  private async getSingleData(endpoint: string, authHeader?: string): Promise<any> {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      throw new HttpException('Authorization token gerekli', HttpStatus.UNAUTHORIZED);
    }

    try {
      const baseUrl = this.getLogoApiUrl();
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
   * Query parametrelerini URL string'e dönüştür
   * C# dokümantasyonundaki ?offset=10&limit=20 formatı
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
   * Logo REST API sonucunu standart pagination formatına dönüştür
   */
  private formatPaginatedResult(result: any, query: LogoQueryDto): PaginatedResult<any> {
    // Eğer result array ise, direkt kullan
    const data = Array.isArray(result) ? result : result.data || [result];
    
    return {
      data,
      meta: {
        offset: query.offset || 0,
        limit: query.limit || 10,
        total: result.total || data.length,
        hasNext: data.length === (query.limit || 10),
        hasPrev: (query.offset || 0) > 0,
      },
    };
  }

  /**
   * Authorization header'dan token çıkar
   */
  private extractToken(authHeader?: string): string {
    if (!authHeader) return '';
    
    const parts = authHeader.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      return parts[1];
    }
    
    return '';
  }

  // ============== POST OPERATIONS - Veri Oluşturma ============== //

  /**
   * Satış siparişi oluşturma - C# dokümantasyonundaki örnek
   */
  async createSalesOrder(
    createSalesOrderDto: CreateSalesOrderDto, 
    authHeader?: string
  ): Promise<SalesOrderResponseDto> {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      throw new HttpException('Authorization token gerekli', HttpStatus.UNAUTHORIZED);
    }

    try {
      const baseUrl = this.getLogoApiUrl();
      const endpoint = `${baseUrl}/api/v1/salesOrders`;

      // Özel değerleri işle (NUMBER = "~" gibi)
      const processedData = this.processSpecialValues(createSalesOrderDto);

      this.logger.log(`POST ${endpoint} - Sipariş oluşturuluyor`);

      const result = await this.httpClientService.httpPost(endpoint, processedData, token);

      // POST başarılıysa INTERNAL_REFERENCE ile full data da okuyabilir
      if (result.INTERNAL_REFERENCE) {
        this.logger.log(`Sipariş oluşturuldu - ID: ${result.INTERNAL_REFERENCE}`);
      }

      return result;

    } catch (error) {
      this.logger.error('Sipariş oluşturma hatası:', error.message);
      throw new HttpException(
        `Sipariş oluşturulamadı: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * POST sonrası detaylı sipariş okuma - expandLevel=full ile
   */
  async getSalesOrderFull(id: number, authHeader?: string): Promise<any> {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      throw new HttpException('Authorization token gerekli', HttpStatus.UNAUTHORIZED);
    }

    try {
      const baseUrl = this.getLogoApiUrl();
      const endpoint = `${baseUrl}/api/v1/salesOrders/${id}?expandLevel=full`;

      this.logger.log(`GET ${endpoint} - Detaylı sipariş okunuyor`);

      return await this.httpClientService.httpGet(endpoint, token);

    } catch (error) {
      this.logger.error(`Detaylı sipariş okuma hatası (ID: ${id}):`, error.message);
      throw new HttpException(
        `Detaylı sipariş okunamadı: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Malzeme kartı oluşturma
   */
  async createItem(createItemDto: CreateItemDto, authHeader?: string): Promise<any> {
    return this.createDataGeneric('items', createItemDto, authHeader);
  }

  /**
   * Cari kart oluşturma
   */
  async createAccount(createAccountDto: CreateAccountDto, authHeader?: string): Promise<any> {
    return this.createDataGeneric('accounts', createAccountDto, authHeader);
  }

  /**
   * Genel veri oluşturma
   */
  async createData(endpoint: string, data: any, authHeader?: string): Promise<any> {
    return this.createDataGeneric(endpoint, data, authHeader);
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
      const baseUrl = this.getLogoApiUrl();
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
   * Private method - Genel POST işlemi
   */
  private async createDataGeneric(endpoint: string, data: any, authHeader?: string): Promise<any> {
    const token = this.extractToken(authHeader) || this.authService.getCurrentToken();
    
    if (!token) {
      throw new HttpException('Authorization token gerekli', HttpStatus.UNAUTHORIZED);
    }

    try {
      const baseUrl = this.getLogoApiUrl();
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
   * Özel değerleri işle (NUMBER = "~" gibi)
   * C# dokümantasyonundaki özel komutları handle et
   */
  private processSpecialValues(data: any): any {
    const processedData = JSON.parse(JSON.stringify(data)); // Deep clone

    // NUMBER = "~" otomatik numaralama için
    if (processedData.NUMBER === '~') {
      this.logger.log('Otomatik numaralama kullanılıyor (NUMBER = "~")');
      // ~ değeri olduğu gibi kalacak, Logo API tarafından işlenecek
    }

    // DATE formatını kontrol et
    if (processedData.DATE) {
      // Logo API'nin beklediği format kontrolü
      processedData.DATE = this.formatDateForLogo(processedData.DATE);
    }

    // TIME değeri yoksa current time kullan
    if (!processedData.TIME) {
      processedData.TIME = this.getCurrentLogoTime();
    }

    return processedData;
  }

  /**
   * Date'i Logo API formatına çevir
   */
  private formatDateForLogo(dateString: string): string {
    // Logo API "02.05.2016" formatını bekliyor
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
  }

  /**
   * Logo TIME formatında current time
   */
  private getCurrentLogoTime(): number {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    
    // Logo TIME formatı: HHMMSS şeklinde sayı
    return hours * 10000 + minutes * 100 + seconds;
  }

  /**
   * Logo API URL'ini döndür
   */
  private getLogoApiUrl(): string {
    // Dokümantasyondaki örnekteki URL formatı
    // Gerçek projede config'den alınabilir
    return this.configService.get<string>('baseUrl') || 'http://172.16.57.114:32001';
  }
}