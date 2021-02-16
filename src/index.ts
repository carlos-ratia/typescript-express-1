import express, { Application, NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv, { DotenvConfigOutput } from "dotenv";
import _ from "lodash";
import { Ping } from "./Application/Actions/Infrasture/Ping";
import { Load as LoadBrandById } from "./Application/Actions/ORM/Brand/Load";
import { Create as CreateBrand } from "./Application/Actions/ORM/Brand/Create";
import { Read as ReadBrand } from "./Application/Actions/ORM/Brand/Read";
import { EventManager } from "./Domain/Event/EventManager";
import { EVENT_ORM_BRAND_CREATE } from "./Domain/Repository/BrandRepository";
import { EventDTO } from "./Domain/DTO/EventDTO";
import PromiseB from "bluebird";
import { DBManager } from "./Infrastructure/DBManager";

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

//REGISTRAR
EventManager.getInstance().register({
  eventListener: {
    eventId: EVENT_ORM_BRAND_CREATE,
    listener: (args: EventDTO): PromiseB<void> => {
      return PromiseB.try(() => {
        console.log(">>>>>EVENTO1");
      })
        .then(() => {
          return DBManager.getInstance().events.create({
            data: {
              eventType: "CREATE",
              entityType: "BRAND",
              entityId: args.payload.after.id,
              payload: args.payload,
            },
          });
        })
        .then((events) => {
          console.dir(events);
        })
        .then(() => {
          console.log("<<<<<EVENTO1");
        });
    },
  },
});

EventManager.getInstance().register({
  eventListener: {
    eventId: EVENT_ORM_BRAND_CREATE,
    listener: (args: EventDTO): PromiseB<void> => {
      return PromiseB.try(() => {
        console.log(">>>>>EVENTO2");
        console.dir(args);
        console.log("<<<<<EVENTO2");
      });
    },
  },
});

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: /^https:\/\/(.*)\.(bunkerdb|eagle-latam)\.com$/ }));
app.use(helmet());

app.get("/ping", new Ping().call);
app.get("/brands", new ReadBrand().call);
app.get("/brands/:id", new LoadBrandById().call);
app.post("/brands/", new CreateBrand().call);

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
