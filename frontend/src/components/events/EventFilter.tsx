import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

function EventFilter({ searchText, category, categories, onSearchChange, onCategoryChange }: EventFilterProps) {
  return (
    <div className="filtre-alani">
      <label>
        Etkinlik ara
        <input 
          type="search" 
          value={searchText} 
          onChange={(e) => onSearchChange(e.target.value)} 
          placeholder="Örn. atölye, kariyer" 
        />
      </label>
      <label>
        Kategori
        <select value={category} onChange={(e) => onCategoryChange(e.target.value as Category | "")}>
          <option value="">Tümü</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default EventFilter;