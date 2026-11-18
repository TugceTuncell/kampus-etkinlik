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
  res.status(404).json({
    error: { message: "Route not found" },
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err.message);

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      error: { message: "Invalid JSON body" },
    });
  }

  res.status(500).json({
    error: { message: "Server error" },
  });
});

export default app;