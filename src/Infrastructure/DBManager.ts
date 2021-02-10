import { PrismaClient, Prisma } from "@prisma/client";

export class DBManager {
  private static _instance: PrismaClient;

  public static getInstance(): PrismaClient {
    if (DBManager._instance === undefined || DBManager._instance === null) {
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

      prisma.$use(
        async (
          params: Prisma.MiddlewareParams,
          next: (params: Prisma.MiddlewareParams) => Promise<any>
        ) => {
          const b = Date.now();
          const result = await next(params); //SE EJECUTO LA ACCION
          const a = Date.now();
          console.dir(`Time ${params.model}:${params.action} ${a - b} ms`);
          return result;
        }
        //
      );

      prisma.$use(
        async (
          params: Prisma.MiddlewareParams,
          next: (params: Prisma.MiddlewareParams) => Promise<any>
        ) => {
          const result = await next(params); //SE EJECUTO LA ACCION

          if (params.model !== "Events") {
            await prisma.events.create({
              data: {
                eventType: params.action,
                entityType: params.model ?? "UNDEFINED",
                entityId: result.id ?? "UNDEFINED",
                payload: {
                  after: {
                    params: params.args,
                  },
                  before: result,
                },
              },
            });
          }
          return result;
        }
      );
      DBManager._instance = prisma;
    }
    return DBManager._instance;
  }
}
