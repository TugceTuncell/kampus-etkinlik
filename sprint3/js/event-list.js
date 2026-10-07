import { events } from "./data.js";

function formatTarih(tarihStr) {
    const p = tarihStr.split("-");
    return new Date(p[2], p[1] - 1, p[0]).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', year: 'numeric' });
}

function createCard(e) {
    return `<article class="kart">
        <h3>${e.title}</h3>
        <p><strong>${e.category}</strong></p>
        <p>Tarih: ${formatTarih(e.date)}, ${e.time}</p>
        <p>Yer: ${e.location} &middot; ${e.capacity} Kişi</p>
        <a href="etkinlik-detay.html?id=${e.id}">Detayları gör &rarr;</a>
    </article>`;
}

const list = document.querySelector("#etkinlik-listesi");
const filtreFormu = document.querySelector("#filtre-formu");
const aramaKutusu = document.querySelector("#arama");
const kategoriSecimi = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

function render(dizi) {
    if(!list) return;
    list.innerHTML = dizi.map(createCard).join("");
}

if (list && list.dataset.limit) {
    const yaklasan = [...events].sort((a, b) => {
        return a.date.split("-").reverse().join("-").localeCompare(b.date.split("-").reverse().join("-"));
    }).slice(0, Number(list.dataset.limit));
    render(yaklasan);
} else if (list) {
    const kategoriler = [...new Set(events.map(e => e.category))];
    kategoriler.forEach(k => {
        kategoriSecimi.innerHTML += `<option value="${k}">${k}</option>`;
    });

    function filtrele(e) {
        if(e) e.preventDefault();
        const aranan = aramaKutusu.value.toLocaleLowerCase("tr-TR");
        const secilenKat = kategoriSecimi.value;

        const sonuc = events.filter(etk => {
            const metinUyuyor = etk.title.toLocaleLowerCase("tr-TR").includes(aranan) || etk.description.toLocaleLowerCase("tr-TR").includes(aranan);
            const katUyuyor = secilenKat === "" || etk.category === secilenKat;
            return metinUyuyor && katUyuyor;
        });

        render(sonuc);
        sonucSatiri.textContent = sonuc.length === 0 ? "Aramanıza uygun etkinlik bulunamadı." : `${sonuc.length} etkinlik listeleniyor.`;
    }

    if(aramaKutusu) aramaKutusu.addEventListener("input", filtrele);
    if(kategoriSecimi) kategoriSecimi.addEventListener("change", filtrele);
    if(filtreFormu) filtreFormu.addEventListener("submit", filtrele);

    render(events);
    if(sonucSatiri) sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
}