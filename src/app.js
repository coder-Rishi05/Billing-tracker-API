import express from "express";

export const app = express();
import webhookRoutes from "./routes/webhook.routes.js";

app.use("/api/webhooks", webhookRoutes);
