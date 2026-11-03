import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Category, EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <label htmlFor="title">Etkinlik Adı</label>
      <input id="title" name="title" maxLength={80} value={data.title}
        onChange={handleChange} placeholder="Örn. Kariyer Günleri 2026"
        aria-invalid={errors.title ? true : undefined} aria-describedby={errors.title ? "title-error" : undefined} />
      {errors.title && <span id="title-error" className="hata-metni">{errors.title}</span>}

      <label htmlFor="category">Kategori</label>
      <select id="category" name="category" value={data.category} onChange={handleChange}
        aria-invalid={errors.category ? true : undefined} aria-describedby={errors.category ? "category-error" : undefined}>
        <option value="">Seçiniz</option>
        {categories.map((category) => <option key={category} value={category}>{category}</option>)}
      </select>
      {errors.category && <span id="category-error" className="hata-metni">{errors.category}</span>}

      <label htmlFor="date">Tarih</label>
      <input id="date" name="date" type="date" value={data.date} onChange={handleChange}
        aria-invalid={errors.date ? true : undefined} aria-describedby={errors.date ? "date-error" : undefined} />
      {errors.date && <span id="date-error" className="hata-metni">{errors.date}</span>}

      <label htmlFor="time">Saat</label>
      <input id="time" name="time" type="time" value={data.time} onChange={handleChange}
        aria-invalid={errors.time ? true : undefined} aria-describedby={errors.time ? "time-error" : undefined} />
      {errors.time && <span id="time-error" className="hata-metni">{errors.time}</span>}

      <label htmlFor="location">Yer</label>
      <input id="location" name="location" value={data.location} onChange={handleChange}
        placeholder="Örn. A Blok Konferans Salonu"
        aria-invalid={errors.location ? true : undefined} aria-describedby={errors.location ? "location-error" : undefined} />
      {errors.location && <span id="location-error" className="hata-metni">{errors.location}</span>}

      <label htmlFor="capacity">Kontenjan</label>
      <input id="capacity" name="capacity" type="number" min={1} max={1000} step={1}
        value={data.capacity} onChange={handleChange}
        aria-invalid={errors.capacity ? true : undefined} aria-describedby={errors.capacity ? "capacity-error" : undefined} />
      {errors.capacity && <span id="capacity-error" className="hata-metni">{errors.capacity}</span>}

      <label htmlFor="description">Açıklama</label>
      <textarea id="description" name="description" rows={5} value={data.description} onChange={handleChange}
        aria-invalid={errors.description ? true : undefined} aria-describedby={errors.description ? "description-error" : undefined} />
      {errors.description && <span id="description-error" className="hata-metni">{errors.description}</span>}
      <button className="btn-git" type="submit">{submitText}</button>
    </form>
  );
}
export default EventForm;