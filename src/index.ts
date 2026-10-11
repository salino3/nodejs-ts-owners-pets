import fs from "fs";
import path from "path";
import { QueryResult } from "pg";
// import http2 from "http2";
import https from "https";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { query } from "./db";
import routerOwner from "./routes/owners.route";
import { FRONTEND_DEV_PORT, FRONTEND_PROD_PORT, PORT } from "./constants";

// @ts-ignore
const currentDir = import.meta.dirname;

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? FRONTEND_PROD_PORT
        : FRONTEND_DEV_PORT,
    credentials: true,
  }),
);

app.use("/api", routerOwner);

app.get("/health", (req: Request, res: Response) =>
  res.json({ status: "online", project: "nodejs-ts-owners-pets" }),
);

// Endpoint PING
app.get("/test-db", async (req: Request, res: Response): Promise<Response> => {
  try {
    const result: QueryResult<any> = await query("SELECT NOW()");

    if (!result) {
      throw new Error();
    }

    return res.send(
      "Database connected successfully! Server time: " + result.rows[0].now,
    );
  } catch (err: unknown) {
    return res.send("❌ Database connection failed, " + err);
  }
});

//* HTTPS2
// Uploading local SSL certificates
// const credentials: http2.SecureServerOptions = {
//   key: fs.readFileSync(path.join(currentDir, "../key.pem")),
//   cert: fs.readFileSync(path.join(currentDir, "../cert.pem")),
// };

// http2.createSecureServer(credentials, app as any).listen(Number(PORT), () => {
//   console.log(`🚀 Server HTTP/2 up and running at https://localhost:${PORT}`);
// });

//*HHTPS1
const credentials = {
  key: fs.readFileSync(path.join(currentDir, "../key.pem")),
  cert: fs.readFileSync(path.join(currentDir, "../cert.pem")),
};

https.createServer(credentials, app as any).listen(Number(PORT), () => {
  console.log(`🚀 Server HTTPS up and running at https://localhost:${PORT}`);
});
