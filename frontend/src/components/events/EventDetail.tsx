import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps { event: CampusEvent; }

function EventDetail({ event }: EventDetailProps) {
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
        <Link className="btn-git" to="/events">← Listeye dön</Link>
        <Link className="btn-git" to={`/admin/${event.id}/edit`}>Bu etkinliği güncelle</Link>
      </div>
    </div>
  );
}
export default EventDetail;