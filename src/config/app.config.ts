export interface AppConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  purchaseApiUrl?: string;
  salesInvoiceApiUrl?: string;
  purchaseInvoiceApiUrl?: string;
}

export const appConfig = (): AppConfig => ({
  clientId: process.env.CLIENT_ID || 'DUMMY_CLIENT_ID',
  clientSecret: process.env.CLIENT_SECRET || 'DUMMY_CLIENT_SECRET',
  baseUrl: process.env.BASE_URL || 'http://dummy-base-url/api/v1',
  purchaseApiUrl: process.env.PURCHASE_API_URL || 'http://dummy-purchase-api-url',
  salesInvoiceApiUrl: process.env.SALES_INVOICE_API_URL || 'http://dummy-sales-invoice-api-url',
  purchaseInvoiceApiUrl: process.env.PURCHASE_INVOICE_API_URL || 'http://dummy-purchase-invoice-api-url',
});