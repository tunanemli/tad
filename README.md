# NestJS Logo REST API Entegrasyonu

Logo ERP sistemi ile entegrasyon için geliştirilmiş NestJS tabanlı REST API uygulaması.

## 🚀 Özellikler

- ✅ **Authentication Service** - Logo API token yönetimi
- ✅ **HTTP Client Service** - Tüm REST operasyonları (GET, POST, PUT, PATCH, DELETE)
- ✅ **Logo API Endpoints** - Pagination desteğiyle GET/POST işlemleri
- ✅ **Web Interface** - Handlebars templates ile test arayüzü
- ✅ **DTO Validation** - class-validator ile veri doğrulama
- ✅ **Special Value Processing** - NUMBER='~' ve tarih formatı işleme
- ✅ **Error Handling** - Kapsamlı hata yönetimi
- ✅ **Environment Configuration** - Güvenli konfigürasyon

## 🛠️ Teknolojiler

- **NestJS** - Node.js framework
- **TypeScript** - Type-safe development
- **Handlebars** - Template engine
- **Axios** - HTTP client
- **class-validator** - DTO validation
- **class-transformer** - Data transformation

## 📦 Kurulum

```bash
# Dependencies'leri yükle
npm install

# Development modunda çalıştır
npm run start:dev

# Production build
npm run build
npm run start:prod
```

## 🌐 Endpoints

### Web Interface
- `GET /web` - Ana sayfa
- `GET /web/auth` - Authentication sayfası
- `GET /web/logo-test` - Logo GET API test
- `GET /web/logo-post` - Logo POST API test
- `GET /web/api-test` - Genel API test

### Authentication
- `POST /auth/token` - Logo API token al
- `GET /auth/status` - Token durumu
- `POST /auth/logout` - Çıkış yap

### Logo API
- `GET /logo/items` - Malzeme listesi
- `GET /logo/accounts` - Cari listesi
- `GET /logo/orders` - Sipariş listesi
- `POST /logo/salesOrders` - Satış siparişi oluştur
- `POST /logo/items` - Malzeme oluştur
- `POST /logo/accounts` - Cari oluştur

### Generic API
- `GET /api/data/:endpoint` - Genel GET
- `POST /api/data/:endpoint` - Genel POST
- `PUT /api/data/:endpoint` - Genel PUT
- `PATCH /api/data/:endpoint` - Genel PATCH
- `DELETE /api/data/:endpoint` - Genel DELETE

## ⚙️ Konfigürasyon

Environment variables (.env dosyası):

```env
CLIENT_ID=your_logo_client_id
CLIENT_SECRET=your_logo_client_secret
BASE_URL=http://your_logo_server:port
PORT=3000
```

## 🔒 Güvenlik

- Private repository
- Environment variables ile sensitive data
- .gitignore ile .env dosyaları korunur
- Token-based authentication

## 📝 Kullanım

1. Logo sunucu bilgilerini `.env` dosyasında ayarlayın
2. `npm run start:dev` ile uygulamayı çalıştırın
3. `http://localhost:3000/web` adresinden web arayüzüne erişin
4. Authentication sayfasından Logo'ya giriş yapın
5. GET/POST işlemlerini test edin

## 🤝 Katkı

1. Fork yapın
2. Feature branch oluşturun
3. Commit'lerinizi yapın
4. Pull request gönderin

## 📄 Lisans

ISC