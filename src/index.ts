import express, {Application, NextFunction, Request, Response} from 'express';
import createHttpError from "http-errors";

const sum = (a: number, b: number): number => {
  return a + b;
};

//npm install express
//npm install -D @types/express
const app: Application = express();
const port: number = 5000;

//MW
// app.use(HANDLE)
// HANDLER: (req:Request, resp:Response, next: NextFunction): void
// MW -> APLICACION
//  Para pasar objetos a traves de MW se puede realizar en la varialer res.locals
//
app.use((_req:Request, res:Response, next: NextFunction)=> {
  res.locals.a = 1
  next();
})

app.use((_req:Request, res:Response, next: NextFunction)=> {
  res.locals.b = 2
  next();
})

app.use((_req:Request, res:Response, next: NextFunction)=> {
  console.log('MW');
  console.log(res.locals);
  next();
})

// |
// |
// v
// app.[get|post|put|delete...|all](PATTERN, HANDLE);
// app.get('/ping', (req, res) => {});
// src/index.ts:7:19 - error TS6133: 'req' is declared but its value is never read.
//  Para evitar este tipo de error en tiempo de compilacion se le agrega una _ adelanta de la variable
app.get('/ping', (_req, res) => {
  console.log('ROUTE');
  console.log(res.locals);
  res.json({
    statusCode: 200,
    data: { status: 'ok' },
  });
});

app.all('/pong', (req: Request, res: Response) => {
  console.log(req.params);
  res.json({
    statusCode: 200,
    data: { status: 'ok' },
  });
})

//ROUTER -> Dependencia ????
app.get('/:a(\\d+)/:b(\\d+)/sum', (req, res) => {
  const params = req.params;
  console.log(req.query);
  let a: string | undefined = params.a;
  let b: string | undefined = params.b;
  let aNumber: number = a === undefined ? 0 : parseFloat(a);
  let bNumber: number = b === undefined ? 0 : parseFloat(b);

  res.json({
    statusCode: 200,
    data: sum(aNumber, bNumber),
  });
});

app.use((_req: Request, _res: Response, next:NextFunction) => {
  //MW NO FOUNY
  next(createHttpError(404))
});


app.listen(port, () => {
  console.log(
    ' App is running at http://localhost:%d in %s mode',
    port,
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});
