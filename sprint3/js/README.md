

# Kampüs Etkinlikleri - Sprint 3 (JavaScript ve DOM)

Bu proje, üniversite kampüsündeki seminer ve atölye gibi etkinliklerin listelendiği, filtrelenebildiği ve detaylarının görüntülenebildiği dinamik bir web arayüzüdür. Sprint 3 kapsamında sayfalar statik HTML'den kurtarılmış; Vanilla JavaScript ve DOM manipülasyonu ile tamamen dinamik hale getirilmiştir.

## Geliştirici Bilgileri
* **Ad Soyad:** Tuğçe Tunçel
* **Öğrenci Numarası:** 2311012063

## Teknik Özellikler ve Kazanımlar
* **Modüler Mimari (ES Modules):** Kodlar `data.js`, `event-list.js`, `event-detail.js` ve `event-form.js` olmak üzere 4 ayrı modüle bölünerek `type="module"` yapısıyla HTML'e entegre edilmiştir. Framework (React vb.) veya jQuery kullanılmamıştır.
* **Dinamik İçerik Üretimi:** Ana sayfa ve liste sayfasındaki etkinlik kartları `data.js` dosyasından okunarak JavaScript tarafından otomatik üretilmektedir.
* **Filtreleme ve Arama:** Etkinlikler sayfasında kategori bazlı (Set kullanılarak veriden çekilen kategorilerle) ve metin bazlı anlık filtreleme yapılabilmektedir.
* **URL Parametreleri ile Yönlendirme:** `URLSearchParams` kullanılarak `?id=` parametresi üzerinden seçilen etkinliğin detay sayfası oluşturulmaktadır. Geçersiz ID girişlerinde hata yönetimi sağlanmıştır.
* **Form Doğrulama (Validation):** Tarayıcı uyarıları devre dışı bırakılmış (`novalidate`), form alanları JavaScript ile anlık kontrol edilerek hatalı girişlerde aria etiketleri ve uyarı metinleriyle kullanıcı bilgilendirilmiştir. Başarılı girişte `FormData` nesnesi JSON olarak ekrana yazdırılır.