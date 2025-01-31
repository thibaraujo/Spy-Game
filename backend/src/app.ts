"use strict";
import "dotenv/config";
import db, { configureSchemas } from "./services/database";
import express from "express";
import routes from "./routes";
import cors from "cors";
import { errors } from "celebrate";
import { errorHandler } from "./services/errorHandler";

// DATABASE
db.connect();

// SCHEMAS CONFIG
configureSchemas();

// EXPRESS
const app: express.Express = express();

// CORS
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "Referer",
    "User-Agent",
    "X-KL-Ajax-Request",
    "Authorization",
    "X-Requested-With",
    "Content-Type",
    "Access-Control-Allow-Origin",
    "Accept",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
};

app.use(cors(options));

app.use(express.json());
app.use("/api", routes);

app.disable("x-powered-by");

// CELEBRATE VALIDATION
app.use(errors());
app.use(errorHandler);

export default app;
