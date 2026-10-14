import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const formatDate = (dateStr: string) => 
  new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  
  
  let headerTitle = "Kampüs Etkinlikleri";
  let headerDesc = "";
  if (page === "home") {
    headerTitle = "Kampüs Etkinlikleri";
    headerDesc = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  } else if (page === "events") {
    headerTitle = "Tüm Etkinlikler";
    headerDesc = "Kampüste düzenlenen tüm güncel etkinlikleri buradan takip edebilirsiniz.";
  } else if (page === "detail" && selected) {
    headerTitle = selected.title;
  } else if (page === "add") {
    headerTitle = "Etkinlik Ekle";
  } else if (page === "update") {
    headerTitle = "Etkinlik Güncelle";
  }

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${headerTitle}`;
  }, [headerTitle]);

  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const categories = [...new Set(events.map(e => e.category))];

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <span className="etiket">{event.category}</span>
        <p>Tarih: {formatDate(event.date)}, {event.time}</p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a href={`?id=${event.id}`} onClick={(e) => { e.preventDefault(); go("detail", event.id); }}>
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{headerTitle}</h1>
        {headerDesc && <p>{headerDesc}</p>}
        <nav className="menu">
          <ul>
            <li><a href="#" aria-current={page === "home" ? "page" : undefined} onClick={(e) => { e.preventDefault(); go("home"); }}>Ana Sayfa</a></li>
            <li><a href="#" aria-current={page === "events" ? "page" : undefined} onClick={(e) => { e.preventDefault(); go("events"); }}>Etkinlikler</a></li>
            <li><a href="#" aria-current={(page === "add" || page === "update") ? "page" : undefined} onClick={(e) => { e.preventDefault(); go("add"); }}>Ekle</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <br />
            <button className="btn-git" onClick={() => go("events")}>Tüm etkinlikleri gör</button>
          </>
        )}

        {page === "events" && (
          <>
            <div className="filtre-alani">
              <label>
                Etkinlik ara
                <input type="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Örn. atölye, kariyer" />
              </label>
              <label>
                Kategori
                <select value={category} onChange={(e) => setCategory(e.target.value as Category | "")}>
                  <option value="">Tümü</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </label>
            </div>
            <p className="sonuc-sayisi">{filtered.length === 0 ? "Etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}</p>
            <section className="etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {page === "detail" && (
          <>
            {!selected && (
              <div className="hata">
                <p>Etkinlik bulunamadı.</p>
                <button className="btn-git" onClick={() => go("events")}>Listeye dön</button>
              </div>
            )}
            {selected && (
              <div className="detay-sayfasi">
                {selected.image && (
                  <figure className="detay-afis">
                    <img src={selected.image} alt={selected.title} />
                    <figcaption><i>{selected.title} afişi</i></figcaption>
                  </figure>
                )}
                
                <div className="kunye-kutu">
                  <h2>Etkinlik Künyesi</h2>
                  <dl>
                    <dt>Tarih</dt><dd>{formatDate(selected.date)}, {selected.time}</dd>
                    <dt>Yer</dt><dd>{selected.location}</dd>
                    <dt>Kategori</dt><dd>{selected.category}</dd>
                    <dt>Kontenjan</dt><dd>{selected.capacity} kişi</dd>
                  </dl>
                </div>

                <div className="detay-aciklama">
                  <h2>Açıklama</h2>
                  <p>{selected.description}</p>
                </div>
                
                <div className="detay-butonlar">
                  <button className="btn-git" onClick={() => go("events")}>← Listeye dön</button>
                  <button className="btn-git" onClick={() => go("update", selected.id)}>Bu etkinliği güncelle</button>
                </div>
              </div>
            )}
          </>
        )}

        {(page === "add" || page === "update") && (
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <p className="form-not">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            
            <label htmlFor="title">Etkinlik Adı</label>
            <input id="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />
            
            <label htmlFor="category">Kategori</label>
            <select id="category">
              <option value="">Seçiniz</option>
              <option value="Seminer">Seminer</option>
              <option value="Atölye">Atölye</option>
              <option value="Söyleşi">Söyleşi</option>
              <option value="Yarışma">Yarışma</option>
            </select>
            
            <label htmlFor="date">Tarih</label>
            <input id="date" type="date" />
            
            <label htmlFor="time">Saat</label>
            <input id="time" type="time" />
            
            <label htmlFor="location">Yer</label>
            <input id="location" placeholder="Örn. A Blok Konferans Salonu" />
            
            <label htmlFor="capacity">Kontenjan</label>
            <input id="capacity" type="number" />

            <label htmlFor="description">Açıklama</label>
            <textarea id="description" rows={5} />
            
            <button className="btn-git" type="submit">Kaydet</button>
          </form>
        )}
      </main>
    </>
  );
}

export default App;