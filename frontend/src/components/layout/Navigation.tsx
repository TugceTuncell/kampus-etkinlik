import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      <ul>
        <li>
          <a href="#" aria-current={current === "home" ? "page" : undefined} onClick={(e) => { e.preventDefault(); onNavigate("home"); }}>
            Ana Sayfa
          </a>
        </li>
        <li>
          <a href="#" aria-current={current === "events" ? "page" : undefined} onClick={(e) => { e.preventDefault(); onNavigate("events"); }}>
            Etkinlikler
          </a>
        </li>
        <li>
          <a href="#" aria-current={(current === "add" || current === "update") ? "page" : undefined} onClick={(e) => { e.preventDefault(); onNavigate("add"); }}>
            Ekle
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;