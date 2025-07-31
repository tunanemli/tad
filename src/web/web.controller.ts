import { Controller, Get, Render } from '@nestjs/common';

@Controller('web')
export class WebController {
  /**
   * Ana sayfa - Dashboard
   */
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
  @Get('purchase-test')
  @Render('purchase-test')
  getPurchaseTest() {
    return {
      title: 'Satın Alma Modülü Test',
      isPurchaseTest: true,
    };
  }

  @Get('sales-invoice-test')
  @Render('sales-invoice-test')
  getSalesInvoiceTest() {
    return {
      title: 'Satış Faturaları Modülü Test',
      isSalesInvoiceTest: true,
    };
  }

  @Get('purchase-invoice-test')
  @Render('purchase-invoice-test')
  getPurchaseInvoiceTest() {
    return {
      title: 'Satın Alma Faturaları Modülü Test',
      isPurchaseInvoiceTest: true,
    };
  }
}