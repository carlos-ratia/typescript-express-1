import express, { Application, NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
//import PromiseB from "bluebird";
import _ from "lodash";
import { PrismaClient } from "@prisma/client";

//VIA 1 DB EXISTE
//DEPENDENCIA
//npm install -g npx --force
//npm install bluebird
//npm install -D @types/bluebird
//npm install -D @prisma/cli
//STEP 1
// ->  npx prisma init
// GENERO prisma/schema.prisma
//        .env DNS de conexion a DB(MYSQL)
//STEP 2
// ->  npx prisma introspect
//    Genero los modelos en prisma/schema.prisma que existan en la DB
//STEP 3
// ->  npx prisma validate
//    Valido que los modelos obtenido del DB esten correctos
//STEP 4
// ->  npm install @prisma/client
// Installar el CLIENTE (ORM + DBAL)
// STEP 5
// -> npx prisma generate

// Environment variables loaded from .env
// Prisma schema loaded from prisma/schema.prisma
//
// ✔ Generated Prisma Client (2.15.0) to ./node_modules/@prisma/client in 111ms
// You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client
// ```
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// ```

//LOAD .env add to process.env {[key: string]: string | undefined;}
const result = dotenv.config();

if (result.error) {
  throw result.error;
}


const prisma = new PrismaClient()

_.forIn(
  {
    PORT: process.env.PORT,
  },
  (value: string | null | undefined, key: any) => {
    if (value === undefined || value === null || value === "") {
      console.error(`The ${key} is no define in the .env`);
      process.exit(1);
    }
  }
);

//npm install express
//npm install -D @types/express
const app: Application = express();
const port: number = parseInt(process.env.PORT ?? "5000");

// npm install compression
// npm install -D @types/compression
// https://github.com/expressjs/compression#readme
app.use(compression());

//npm install body-parse
//npm install -D @types/body-parse
//npm ERR! code E404
// npm ERR! 404 Not Found - GET https://registry.npmjs.org/@types%2fbody-parse - Not found
// npm ERR! 404
// npm ERR! 404  '@types/body-parse@latest' is not in the npm registry.
// npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
// npm ERR! 404
// npm ERR! 404 Note that you can also install from a
// npm ERR! 404 tarball, folder, http url, or git url.
//
// npm ERR! A complete log of this run can be found in:
// npm ERR!     /Users/bunker/.npm/_logs/2021-01-26T12_29_00_088Z-debug.log
//
// OJO: No es necesario instalar los types por que el paquete body-parser ya los contiene.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//npm install cors
//npm install -D @types/cors
//https://github.com/expressjs/cors#readme
app.use(cors({ origin: /^https:\/\/(.*)\.(bunkerdb|eagle-latam)\.com$/ }));

//
app.use(helmet());

app.get("/ping", (_req: Request, res: Response) => {
  res.status(200).json({
    statusCode: 200,
    data: { status: "ok" },
  });
});

app.get('/brands', async (_req, res) =>{
  const brands = await prisma.brand.findMany();
  res.status(200).json({
    statusCode: 200,
    data: brands,
  });
});

app.get('/brands/:id', async (req, res) =>{
  const id: number = parseInt(req.params.id ?? "0")
  const brand = await prisma.brand.findUnique({
    where: {
      id: id,
    }
  });
  res.status(200).json({
    statusCode: 200,
    data: brand,
  });
});

app.get("/error", (_req, _res) => {
  throw new Error("Lo SABIA");
});

//NO ROUTE FOUND
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(404));
});

//TODO:ERROR HANDLER
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  //TODA LA LOGICA DE MANEJO DE ERROR
  //console.error(error); // ASPIRANTE A LOGGER
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

//(APP WEB) -> (HTTP NGIX||APACHE) -> [(php-fpm -=> sbin/php) -> (script)]-> PROCESO

//(APP WEB) -> 80:443 (LB:HA:Proxy (NGIX)) (pm2 || xx)-> 5000(HTTP NODE) -> (script) PROCESO (pid, sock)
