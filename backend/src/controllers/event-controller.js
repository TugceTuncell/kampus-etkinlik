import { events } from "../data/events.js";

let lastEventTimestamp = 0;

export function getEvents(req, res) {
  const { category } = req.query;
  const list = category ? events.filter((event) => event.category === category) : events;
  res.json(list);
}

export function getEventById(req, res) {
  const event = events.find((entry) => entry.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: { message: "Event not found" } });
  }

  res.json(event);
}

export function createEvent(req, res) {
  const { title, category, capacity, date, time, location, description } = req.body ?? {};

  const requiredFields = [title, category, date];
  if (requiredFields.some((value) => typeof value !== "string" || value.trim() === "")) {
    return res.status(400).json({
      error: { message: "title, category and date are required" },
    });
  }

  lastEventTimestamp = Math.max(Date.now(), lastEventTimestamp + 1);
  const newEvent = {
    id: `event-${lastEventTimestamp}`,
    title,
    category,
    date,
    capacity: Number(capacity) || 0,
    time: time ?? "",
    location: location ?? "",
    description: description ?? "",
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
}
