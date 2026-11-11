# Kampüs Etkinlikleri API — Sprint 7

Tuğçe Tuncel · 2311012063

Express API, kampüs etkinliklerini JSON olarak sunar. Uygulama, route, controller ve başlangıç verisi ayrı dosyalardadır.

## Kurulum

Komutları depo kökünden başlayarak çalıştırın.

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

`.env` dosyası zaten varsa kopyalama adımını atlayın. PowerShell npm betiğini engellerse `npm.cmd install` ve `npm.cmd run dev` kullanın. macOS ve Linux'ta kopyalama komutu `cp .env.example .env` olur.

Varsayılan adres **http://localhost:3000**. Portu `backend/.env` dosyasındaki `PORT=3000` satırı belirler. `npm run dev` dosyalar değişince sunucuyu yeniden başlatır. `npm start` sunucuyu dosya değişikliklerini izlemeden çalıştırır.

## REST sözleşmesi

| Yöntem | Adres | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu durumu, zaman ve öğrenci numarası | 200 | — | Sprint 7 |
| GET | `/events` | Etkinlikleri listele | 200 | — | Sprint 7 |
| GET | `/events/:id` | Tek etkinliği getir | 200 | 404 | Sprint 7 |
| POST | `/events` | Yeni etkinlik oluştur | 201 | 400 | Sprint 7 |
| PATCH | `/events/:id` | Etkinliği güncelle | 200 | 400, 404 | Sprint 9'da eklenecek |
| DELETE | `/events/:id` | Etkinliği sil | 204 | 404 | Sprint 9'da eklenecek |

Listeyi kategoriye göre süzmek için `GET /events?category=Atölye` kullanılır. `POST` isteği `Content-Type: application/json` ile gönderilir. `title`, `category` ve `date` zorunludur. `capacity` gönderilmezse 0, `time`, `location` ve `description` gönderilmezse boş metin kullanılır.

### Yeni etkinlik örneği

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "capacity": 30,
  "time": "14:00",
  "location": "Bilgisayar Laboratuvarı 1",
  "description": "Git ve GitHub ile ilk adımlar."
}
```

### Bulunamayan etkinlik yanıtı (404)

```json
{ "error": { "message": "Event not found" } }
```

## Postman

`backend/requests/kampus-api.json` dosyasını Postman'da **Import** ile açın. Sunucuyu yeniden başlatıp **Kampüs API** koleksiyonundaki altı isteği sırasıyla çalıştırın.

Varsayılan adres `http://localhost:3000`. Beklenen durum kodları sırasıyla **200, 200, 200, 404, 201, 400**. Başarılı `POST` isteğinden sonra `GET /events` yedi kayıt döndürür.

Etkinlikler bellekte tutulur. Sunucu yeniden başlatılınca başlangıçtaki altı etkinlik geri gelir.