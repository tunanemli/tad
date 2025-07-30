# NestJS REST API Client

Bu proje, C# REST client kodunun NestJS'e uyarlanmış versiyonudur. Logo ERP REST API'leri ile çalışmak için gerekli tüm HTTP metodlarını ve authentication yapısını içerir.

## 📋 Özellikler

✅ **Authentication System**
- Bearer token ile kimlik doğrulama
- Token süresi takibi
- Otomatik token yenileme hazırlığı

✅ **HTTP Client Methods**
- GET, POST, PUT, PATCH, DELETE metodları
- Otomatik error handling
- Bearer token otomasyonu

✅ **C# Kod Uyumluluğu**
- Orijinal C# metodlarının birebir karşılıkları
- Aynı parametre yapısı
- Benzer hata yönetimi

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Uygulamayı geliştirme modunda çalıştır
npm run start:dev

# Production build
npm run build
npm run start:prod
```

## ⚙️ Konfigürasyon

`.env` dosyası oluşturun:

```env
CLIENT_ID=LOGO
CLIENT_SECRET=your_client_secret_here
BASE_URL=https://api.logo.com.tr
PORT=3000
```

## 📡 API Endpoints

### Authentication

#### Token Alma
```http
POST /auth/token
Content-Type: application/json

{
  "username": "kullanici_adi",
  "password": "sifre", 
  "firmno": "firma_numarasi"
}
```

**Yanıt:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

#### Token Durumu
```http
GET /auth/status
```

#### Logout
```http
POST /auth/logout
```

### API İstekleri

Tüm API istekleri için Authorization header gereklidir:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

#### GET İsteği
```http
GET /api/data/{endpoint}
Authorization: Bearer YOUR_ACCESS_TOKEN
```

#### POST İsteği
```http
POST /api/data/{endpoint}
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "data": "your_data_here"
}
```

#### PUT İsteği
```http
PUT /api/data/{endpoint}
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "data": "your_updated_data"
}
```

#### PATCH İsteği
```http
PATCH /api/data/{endpoint}
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "data": "your_partial_update"
}
```

#### DELETE İsteği
```http
DELETE /api/data/{endpoint}
Authorization: Bearer YOUR_ACCESS_TOKEN
```

## 🏗️ Proje Yapısı

```
src/
├── auth/                    # Authentication modülü
│   ├── dto/                # Data Transfer Objects
│   ├── auth.controller.ts  # Auth endpoints
│   ├── auth.service.ts     # Token yönetimi
│   └── auth.module.ts      # Auth modül konfigürasyonu
├── api/                    # API client modülü
│   ├── api.controller.ts   # REST method endpoints
│   └── api.module.ts       # API modül konfigürasyonu
├── common/                 # Ortak servisler
│   ├── http-client.service.ts  # HTTP client servisi
│   └── common.module.ts    # Common modül konfigürasyonu
├── config/                 # Konfigürasyon
│   └── app.config.ts       # Uygulama konfigürasyonu
├── app.module.ts           # Ana modül
└── main.ts                 # Uygulama başlangıcı
```

## 🔄 C# Kodundan Dönüşüm

### Orijinal C# Metodları ➡️ NestJS Karşılıkları

| C# Metod | NestJS Servis | Açıklama |
|----------|---------------|----------|
| `getAccessToken()` | `AuthService.getAccessToken()` | Token alma |
| `HttpGet()` | `HttpClientService.httpGet()` | GET istekleri |
| `HttpPost()` | `HttpClientService.httpPost()` | POST istekleri |
| `HttpPut()` | `HttpClientService.httpPut()` | PUT istekleri |
| `HttpPatch()` | `HttpClientService.httpPatch()` | PATCH istekleri |

### Kullanım Örneği

**C# Kodu:**
```csharp
string token = getAccessToken(url, username, password, firmNr);
string result = HttpGet("https://api.logo.com.tr/endpoint", token);
```

**NestJS Karşılığı:**
```typescript
const token = await this.authService.getAccessToken({
  username, password, firmno
});
const result = await this.httpClientService.httpGet(
  'https://api.logo.com.tr/endpoint', 
  token
);
```

## 🛠️ Geliştirme

### Yeni Endpoint Ekleme

1. DTO oluşturun (gerekirse)
2. Controller'a yeni metod ekleyin
3. Service katmanında business logic uygulayın

### Hata Yönetimi

Tüm HTTP istekleri otomatik error handling ile gelir:
- 401: Token geçersiz
- Network errors: Bağlantı hataları
- API errors: Server yanıt hataları

## 📝 Notlar

- Token'lar otomatik olarak memory'de saklanır
- Production'da Redis/Database kullanımı önerilir
- CORS varsayılan olarak aktiftir
- Validation pipe'ları aktiftir

## 🔗 Faydalı Linkler

- [NestJS Docs](https://docs.nestjs.com/)
- [Axios HTTP Client](https://axios-http.com/)
- [Class Validator](https://github.com/typestack/class-validator)

---

Bu API, Logo ERP REST servislerini kullanmak için gerekli tüm temel yapıyı sağlar. 🚀