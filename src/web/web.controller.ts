import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('web')
@Controller('web')
export class WebController {
  /**
   * Ana sayfa - Dashboard
   */
  @ApiOperation({ summary: 'Ana sayfa', description: 'Web arayüzü ana sayfasını gösterir' })
  @ApiResponse({ status: 200, description: 'Ana sayfa başarıyla yüklendi' })
  @Get()
  @Render('index')
  getHome() {
    return {
      title: 'Ana Sayfa',
      isHome: true,
    };
  }

  /**
   * Kimlik doğrulama sayfası
   */
  @ApiOperation({ summary: 'Kimlik doğrulama sayfası', description: 'Logo API token alma sayfasını gösterir' })
  @ApiResponse({ status: 200, description: 'Kimlik doğrulama sayfası başarıyla yüklendi' })
  @Get('auth')
  @Render('auth')
  getAuth() {
    return {
      title: 'Kimlik Doğrulama',
      isAuth: true,
    };
  }

  /**
   * API test arayüzü sayfası
   */
  @ApiOperation({ summary: 'API test sayfası', description: 'Genel API test arayüzünü gösterir' })
  @ApiResponse({ status: 200, description: 'API test sayfası başarıyla yüklendi' })
  @Get('api-test')
  @Render('api-test')
  getApiTest() {
    return {
      title: 'API Test',
      isApiTest: true,
    };
  }

  /**
   * Logo REST API test sayfası
   */
  @ApiOperation({ summary: 'Logo API test sayfası', description: 'Logo GET API test arayüzünü gösterir' })
  @ApiResponse({ status: 200, description: 'Logo API test sayfası başarıyla yüklendi' })
  @Get('logo-test')
  @Render('logo-test')
  getLogoTest() {
    return {
      title: 'Logo API Test',
      isLogoTest: true,
    };
  }

  /**
   * Logo POST API test sayfası
   */
  @ApiOperation({ summary: 'Logo POST API sayfası', description: 'Logo POST API test arayüzünü gösterir' })
  @ApiResponse({ status: 200, description: 'Logo POST API sayfası başarıyla yüklendi' })
  @Get('logo-post')
  @Render('logo-post')
  getLogoPost() {
    return {
      title: 'Logo POST API',
      isLogoPost: true,
    };
  }

  /**
   * Satın alma modülü test sayfası
   */
  @ApiOperation({ summary: 'Satın alma test sayfası', description: 'Satın alma modülü test arayüzünü gösterir' })
  @ApiResponse({ status: 200, description: 'Satın alma test sayfası başarıyla yüklendi' })
  @Get('purchase-test')
  @Render('purchase-test')
  getPurchaseTest() {
    return {
      title: 'Satın Alma Modülü Test',
      isPurchaseTest: true,
    };
  }

  @ApiOperation({ summary: 'Satış faturaları test sayfası', description: 'Satış faturaları modülü test arayüzünü gösterir' })
  @ApiResponse({ status: 200, description: 'Satış faturaları test sayfası başarıyla yüklendi' })
  @Get('sales-invoice-test')
  @Render('sales-invoice-test')
  getSalesInvoiceTest() {
    return {
      title: 'Satış Faturaları Modülü Test',
      isSalesInvoiceTest: true,
    };
  }

  @ApiOperation({ summary: 'Satın alma faturaları test sayfası', description: 'Satın alma faturaları modülü test arayüzünü gösterir' })
  @ApiResponse({ status: 200, description: 'Satın alma faturaları test sayfası başarıyla yüklendi' })
  @Get('purchase-invoice-test')
  @Render('purchase-invoice-test')
  getPurchaseInvoiceTest() {
    return {
      title: 'Satın Alma Faturaları Modülü Test',
      isPurchaseInvoiceTest: true,
    };
  }
}