# Kampüs Etkinlikleri — Sprint 6 ve Vize

Tuğçe Tuncel — 2311012063

React, TypeScript ve Vite ile geliştirilen kampüs etkinlikleri uygulaması.

## Canlı Uygulama

https://tugcetuncel-frontend.vercel.app/

## Kurulum ve Çalıştırma

Terminali frontend klasöründe açıp aşağıdaki komutları çalıştırın:

```bash
npm install
npm run dev
```

## Üretim Derlemesi

```bash
npm run build
```

## Route Listesi

| Adres | Sayfa |
|---|---|
| / | HomePage |
| /events | EventsPage |
| /events/:id | EventDetailPage |
| /login | LoginPage |
| /register | RegisterPage |
| /forgot-password | ForgotPasswordPage |
| /admin | AdminPage |
| /admin/new | AddEventPage |
| /admin/:id/edit | EditEventPage |
| * | NotFoundPage |

## Özellikler

- React Router ile sayfalar arasında gezinme.
- Etkinlik listeleme ve detay görüntüleme.
- Arama ve kategori filtreleme.
- Context üzerinden ortak etkinlik yönetimi.
- Etkinlik ekleme ve güncelleme.
- Onay alınarak etkinlik silme.
- Kontrollü formlar ve alan bazlı hata mesajları.
- Giriş, kayıt ve şifremi unuttum demo sayfaları.
- Mobil görünümde kartlara dönüşen yönetim tablosu.

## Çalışma Notları

Etkinlik verileri Context içerisinde bellekte tutulur.
Sayfa yenilendiğinde başlangıç verileri geri yüklenir.

Giriş, kayıt ve şifre sıfırlama işlemleri demodur.
Gerçek kullanıcı kaydı, oturum açma veya e-posta gönderimi yapılmaz.
Yönetim sayfasında giriş kontrolü bulunmaz.