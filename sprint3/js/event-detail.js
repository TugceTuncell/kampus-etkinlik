import { events } from "./data.js";

const id = new URLSearchParams(location.search).get("id");
const container = document.querySelector("#detay");
const event = events.find(e => e.id === id);

if (!event) {
    container.innerHTML = `<div class="hata-kutu">"${id}" numaralı etkinlik bulunamadı. Lütfen listeden geçerli bir etkinlik seçin.</div>
    <br><a href="etkinlikler.html" style="color:var(--renk-ana); font-weight:bold;">&larr; Listeye Dön</a>`;
} else {
    document.title = event.title;
    const p = event.date.split("-");
    const t = new Date(p[2], p[1] - 1, p[0]).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });

    const gorselYolu = event.image ? event.image : `https://via.placeholder.com/300x400?text=${event.category}`;
    container.innerHTML = `
        <h1>${event.title}</h1>
        <div class="detay-izgara">
            <figure>
                <img src="${gorselYolu}" alt="${event.title}" style="width:100%; border-radius:8px;">
            </figure>
            <div>
                <h2>Etkinlik Künyesi</h2>
                <dl>
                    <dt>Kategori</dt><dd>${event.category}</dd>
                    <dt>Tarih/Saat</dt><dd>${t}, ${event.time}</dd>
                    <dt>Yer</dt><dd>${event.location}</dd>
                    <dt>Kontenjan</dt><dd>${event.capacity} Kişi</dd>
                </dl>
                <h2>Açıklama</h2>
                <p>${event.description}</p>
                <br>
                <a href="etkinlikler.html" style="color:var(--renk-ana); font-weight:bold; margin-right:20px;">&larr; Listeye Dön</a>
                <a href="etkinlik-guncelle.html?id=${event.id}" style="background:var(--renk-ana); color:white; padding:10px 15px; border-radius:4px; text-decoration:none;">Bu Etkinliği Güncelle</a>
            </div>
        </div>
    `;
}