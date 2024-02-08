import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import winston from 'winston';
import expressWinston from 'express-winston';
import bookRoutes from "./routes/books.js";

/* App Config */
dotenv.config();
const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  meta: false,
  baseMeta: false,
  msg: (req, res) => {
    const stringBody = JSON.stringify(req.body);
    return `HTTP ${req.method} ${req.url} ${res.statusCode} ${res.responseTime}ms, body:${stringBody}`;
  },
  expressFormat: false,
  colorize: false,
  // ignore certain routes.
  ignoreRoute: () => false,
}));

/* API Routes */
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to digital library");
});

export default app