require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/erorr";

export const app = express();

//Body Parser
/* This line of code is setting up middleware in the Express application. Specifically, `express.json({
limit: "50mb" })` is a built-in middleware in Express that parses incoming requests with JSON
payloads. */
app.use(express.json({ limit: "50mb" }));

//cokie parser
app.use(cookieParser());

//Cors => cors origin recourse sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//test api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true, //success
    message: "API is working",
  });
});

//unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} Not Found`) as any;
  err.statusCode = 404;
  next(err);
});
