import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

// Bileşenleri İçe Aktar
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

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

  return (
    <>
      <div style={{ backgroundColor: "var(--renk-ana)" }}>
        <Header title={headerTitle} text={headerDesc} />
        <Navigation current={page} onNavigate={go} />
      </div>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <br />
            <button className="btn-git" onClick={() => go("events")}>Tüm etkinlikleri gör</button>
          </>
        )}

        {page === "events" && (
          <>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            <p className="sonuc-sayisi">
              {filtered.length === 0 ? "Etkinlik bulunamadı." : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <EventList events={filtered} onShowDetail={(id) => go("detail", id)} />
          </>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;