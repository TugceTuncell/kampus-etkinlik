import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2311012063",
  });
});

app.use("/events", eventRoutes);

app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 500
    ? error.status
    : 500;
  const message = error.type === "entity.parse.failed"
    ? "Invalid JSON body"
    : status === 500 ? "Internal server error" : error.message;

  res.status(status).json({ error: { message } });
});

export default app;
