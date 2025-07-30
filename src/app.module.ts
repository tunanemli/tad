import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { ApiModule } from './api/api.module';
import { WebModule } from './web/web.module';
import { LogoModule } from './logo/logo.module';
import { appConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    AuthModule,
    CommonModule,
    ApiModule,
    WebModule,
    LogoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}