import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Template engine konfigürasyonu
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Global validation pipe - DTO validasyonları için
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // CORS aktifleştir (gerekirse)
  app.enableCors();

  // Swagger konfigürasyonu
  const config = new DocumentBuilder()
    .setTitle('Fael ERP - Logo API Entegrasyonu')
    .setDescription('NestJS ile Logo ERP sistemi entegrasyonu için REST API')
    .setVersion('1.0')
    .addTag('auth', 'Kimlik doğrulama işlemleri')
    .addTag('logo', 'Logo ERP API entegrasyonu')
    .addTag('api', 'Genel API işlemleri')
    .addTag('purchase', 'Satın alma işlemleri')
    .addTag('sales', 'Satış işlemleri')
    .addTag('web', 'Web arayüzü')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📱 Web Interface: http://localhost:${port}/web`);
  console.log(`🔐 Auth API: http://localhost:${port}/auth/token`);
  console.log(`📥 Logo GET API: http://localhost:${port}/logo/items`);
  console.log(`📤 Logo POST API: http://localhost:${port}/logo/salesOrders (NEW!)`);
  console.log(`📡 General API: http://localhost:${port}/api/data/{endpoint}`);
  console.log(`📚 Swagger Documentation: http://localhost:${port}/api-docs`);
}
bootstrap();