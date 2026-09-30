# Kampüs Etkinlikleri - Sprint 2 (CSS ve Responsive Tasarım)

Bu proje, Süleyman Demirel Üniversitesi kampüsünde gerçekleştirilecek olan etkinliklerin takibini sağlamak amacıyla geliştirilen web uygulamasının 2. sprint teslimidir. 

## Canlı Yayın Adresi
🔗 **[Vercel canlı linkini buraya yapıştırın]**

## Geliştirici Bilgileri
* **Öğrenci:** Tuğçe Tuncel - Bilgisayar Mühendisliği
* **Öğrenci No:** 2311012063
* **Sprint Sürümü:** `sprint-2`

## Sprint 2 Teknik Detayları
Bu sprint aşamasında Sprint 1'deki semantik HTML yapısı korunarak projeye CSS giydirilmiştir:
* **Mobil Öncelikli (Mobile-First):** Tasarıma öncelikle dar ekranlar (telefonlar) düşünülerek başlanmış, geniş ekranlar için `@media` sorguları ile çoklu sütun (Grid) yapısına geçilmiştir.
* **Dinamik Renk ve Font:** Öğrenci numarasının mod(360) değeri alınarak projeye özgü bir HSL renk paleti üretilmiş, numaranın son hanesine göre `Trebuchet MS` fontu kullanılmıştır.
* **Modern Düzen:** Tablolar kaldırılarak sayfa yapıları `<section>` ve `<article>` tabanlı Grid sistemine geçirilmiştir. Form alanlarında label üstte konumlandırılmış ve `invalid` seçicisi ile boş bırakılan alanlar için hata (kırmızı çerçeve) stili eklenmiştir.
