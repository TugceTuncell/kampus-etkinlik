import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    image: "/afis.png",
    category: "Seminer",
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri.",
    capacity: 120
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    image: "/robotik-afis.jpg",
    category: "Atölye",
    date: "2026-10-20",
    time: "13:00",
    location: "Lab 2",
    description: "Arduino ile robot yapımı.",
    capacity: 30
  },
  {
    id: "event-3",
    title: "Siber Güvenlik 101",
    category: "Seminer",
    date: "2026-10-25",
    time: "15:30",
    location: "B Blok Amfi",
    description: "Temel siber güvenlik kavramları.",
    capacity: 200
  },
  {
    id: "event-4",
    title: "Web Geliştirme",
    category: "Atölye",
    date: "2026-11-05",
    time: "10:00",
    location: "Lab 3",
    description: "Sıfırdan web projesi geliştirme.",
    capacity: 40
  },
  {
    id: "event-5",
    title: "Yapay Zeka Zirvesi",
    category: "Seminer",
    date: "2026-11-15",
    time: "09:30",
    location: "Kültür Merkezi",
    description: "Yapay zeka trendleri.",
    capacity: 350
  },
  {
    id: "event-6",
    title: "Oyun Tasarımı",
    category: "Atölye",
    date: "2026-11-22",
    time: "14:00",
    location: "Lab 1",
    description: "2D platform oyunu tasarlama.",
    capacity: 25
  }
];