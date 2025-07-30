export interface AppConfig {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
}

export const appConfig = (): AppConfig => ({
  clientId: process.env.CLIENT_ID || 'LOGO',
  clientSecret: process.env.CLIENT_SECRET || 'Logo123456',
  baseUrl: process.env.BASE_URL || 'https://api.logo.com.tr',
});