import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { query } from "./db";
import { PORT } from "./constants";
import { QueryResult } from "pg";

const app = express();
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
  }),
);

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

app.listen(PORT, () =>
  console.log(`🚀 Server up and running at http://localhost:${PORT}`),
);
