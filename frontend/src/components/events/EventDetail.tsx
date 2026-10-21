import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <div className="detay-sayfasi">
      {event.image && (
        <figure className="detay-afis">
          <img src={event.image} alt={event.title} />
          <figcaption><i>{event.title} afişi</i></figcaption>
        </figure>
      )}

      <div className="kunye-kutu">
        <h2>Etkinlik Künyesi</h2>
        <dl>
          <dt>Tarih</dt><dd>{formatDate(event.date)}, {event.time}</dd>
          <dt>Yer</dt><dd>{event.location}</dd>
          <dt>Kategori</dt><dd>{event.category}</dd>
          <dt>Kontenjan</dt><dd>{event.capacity} kişi</dd>
        </dl>
      </div>

      <div className="detay-aciklama">
        <h2>Açıklama</h2>
        <p>{event.description}</p>
      </div>

      <div className="detay-butonlar">
        <button className="btn-git" onClick={onBack}>← Listeye dön</button>
        <button className="btn-git" onClick={() => onEdit(event.id)}>Bu etkinliği güncelle</button>
      </div>
    </div>
  );
}

export default EventDetail;