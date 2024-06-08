import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import http from "http";
import morgan from "morgan";
import connectDB from "./lib/db";
import globalErrorHandler from "./middleweres/globalError";
import { notFound } from "./middleweres/not-found";
import routes from "./routes";
dotenv.config();

const app = express();

// middlewere
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

connectDB();

app.get("/", (_, res) => {
  res.send("Hello from the server");
});

app.use("/api/v1", routes);

// 404
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    requestedPath: req.originalUrl,
    method: req.method,
  });
});

// global error handeler

/* eslint-disable @typescript-eslint/no-explicit-any */
app.use(globalErrorHandler);
app.use(notFound);
const server = http.createServer(app);

const port = process.env.PORT || 5000;

// run the server
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
