import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { HttpClientService } from '../common/http-client.service';
import { ConfigService } from '@nestjs/config';
import { LogoQueryDto, PaginatedResult } from '../common/dto/pagination.dto';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);

  constructor(
    private readonly httpClientService: HttpClientService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async getItems(query: LogoQueryDto, authHeader?: string): Promise<PaginatedResult<any>> {
    const endpoint = 'items';
    return this.getDataList(endpoint, query, authHeader);
  }


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
      const baseUrl = this.getPurchaseInvoiceApiUrl();
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

  private getPurchaseInvoiceApiUrl(): string {
    return this.configService.get<string>('purchaseInvoiceApiUrl') || 'http://192.168.1.203:32003';
  }

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
}
