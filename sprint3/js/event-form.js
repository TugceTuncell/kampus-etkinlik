import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const formMesaj = document.querySelector("#form-mesaj");

if (form && form.dataset.mode === "guncelle") {
    const id = new URLSearchParams(location.search).get("id");
    const etkinlik = events.find(e => e.id === id);
    
    if (etkinlik) {
        form.elements.ad.value = etkinlik.title;
        form.elements.kategori.value = etkinlik.category;
        form.elements.tarih.value = etkinlik.date.split("-").reverse().join("-"); // YYYY-MM-DD
        form.elements.saat.value = etkinlik.time;
        form.elements.yer.value = etkinlik.location;
        form.elements.kontenjan.value = etkinlik.capacity;
        form.elements.aciklama.value = etkinlik.description;
    } else {
        form.outerHTML = `<div class="hata-kutu">Güncellenecek etkinlik seçilmedi. Önce detay sayfasından bir etkinlik seçin.</div>
        <br><a href="etkinlikler.html" style="background:var(--renk-ana); color:white; padding:10px; border-radius:4px; text-decoration:none;">Etkinliklere Git</a>`;
    }
}

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault(); 
        
        form.querySelectorAll(".hata-mesaji").forEach(span => span.textContent = "");
        form.querySelectorAll("[aria-invalid='true']").forEach(input => input.removeAttribute("aria-invalid"));
        formMesaj.innerHTML = "";

        const fd = new FormData(form);
        const data = {
            title: fd.get("ad").trim(),
            category: fd.get("kategori"),
            date: fd.get("tarih"),
            time: fd.get("saat"),
            location: fd.get("yer").trim(),
            capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : "",
            description: fd.get("aciklama").trim()
        };

        const errors = {};

        if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
        if (!data.category) errors.kategori = "Lütfen bir kategori seçin.";
        if (!data.date) errors.tarih = "Tarih seçimi zorunludur.";
        if (!data.time) errors.saat = "Saat seçimi zorunludur.";
        if (!data.location) errors.yer = "Yer bilgisi zorunludur.";
        if (data.capacity && (data.capacity < 1 || data.capacity > 1000)) errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalıdır.";

        // Hata varsa ekrana bas
        if (Object.keys(errors).length > 0) {
            for (const key in errors) {
                document.getElementById(key + "-hata").textContent = errors[key];
                document.getElementById(key).setAttribute("aria-invalid", "true");
            }
            formMesaj.innerHTML = `<div class="hata-kutu">Formda hatalı alanlar var, lütfen düzeltin.</div>`;
            return;
        }
        formMesaj.innerHTML = `<div class="basari-kutu"><strong>İşlem Başarılı! (Bu sprintte kaydedilmez)</strong><br><pre>${JSON.stringify(data, null, 2)}</pre></div>`;
    });
}