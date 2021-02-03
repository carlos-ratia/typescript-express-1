import express, { Application, NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv, { DotenvConfigOutput } from "dotenv";
import _ from "lodash";
import { PrismaClient, Brand, Prisma } from "@prisma/client";

const result: DotenvConfigOutput = dotenv.config();

if (result.error) {
  throw result.error;
}

//https://www.prisma.io/docs/concepts/components/prisma-client/crud

_.forIn(
  {
    PORT: process.env.PORT,
    DSN: process.env.DSN,
  },
  (value: string | null | undefined, key: any) => {
    if (value === undefined || value === null || _.isEmpty(value)) {
      console.error(`The ${key} is no define in the .env`);
      process.exit(1);
    }
  }
);

const app: Application = express();
const port: number = parseInt(process.env.PORT ?? "5000");

const prisma = new PrismaClient({
  log: [
    {
      level: "info",
      emit: "stdout",
    },
    {
      level: "warn",
      emit: "stdout",
    },
    {
      level: "query",
      emit: "stdout",
    },
    {
      level: "error",
      emit: "stdout",
    },
  ],
});

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: /^https:\/\/(.*)\.(bunkerdb|eagle-latam)\.com$/ }));
app.use(helmet());

app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).json({
    statusCode: 200,
    data: { status: "ok" },
  });
});

app.get("/brands", async (_req, res) => {
  const brands = await prisma.brand.findMany({
    orderBy: {
      id: Prisma.SortOrder.asc,
    },
  });
  res.status(200).json({
    statusCode: 200,
    data: brands,
  });
});

app.get("/brands/:id", async (req, res) => {
  const id: string = req.params.id ?? "";
  const brand: Brand | null = await prisma.brand.findUnique({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    statusCode: 200,
    data: brand,
  });
});

app.post("/brands/", async (req, res) => {
  const { name, Campaign } = req.body;
  console.log(Campaign);
  const brand: Brand = await prisma.brand.create({
    data: {
      name: name,
    },
  });
  res.status(200).json({
    statusCode: 200,
    data: brand,
  });
});

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404));
});

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  let msj: any;
  if (error instanceof Error) {
    msj = error.message;
  }
  res.status(error.status ?? 500).json({ msj });
});

app.listen(port, () => {
  console.log(
    " App is running at http://localhost:%d in %s mode",
    port,
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});
