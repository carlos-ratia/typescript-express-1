import express, { Application, NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

//npm install express
//npm install -D @types/express
const app: Application = express();
const port: number = 5000;

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
// OJO: No es necesario instalar los types por que el paquete body-parser ya los contiene.
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//npm install cors
//npm install -D @types/cors
app.use(cors({ origin: /^https:\/\/(.*)\.(bunkerdb|eagle-latam)\.com$/ }));

app.use(helmet());

//TODO: Manrdar archivos.
//
// |
// |
// v
// app.[get|post|put|delete...|all](PATTERN, HANDLE);
// app.get('/ping', (req, res) => {});
// src/index.ts:7:19 - error TS6133: 'req' is declared but its value is never read.
//  Para evitar este tipo de error en tiempo de compilacion se le agrega una _ adelante de la variable
app.get('/ping', (_req, res) => {
  console.log('ROUTE');
  console.log(res.locals);
  res.status(200).json({
    statusCode: 200,
    data: { status: 'ok' },
  });
});

app.post(
  '/test',
  (_req, _res, next) => {
    console.log('ME LLAMARON');
    //LOGICA
    next();
  },
  (req, res) => {
    console.log(req.body);
    console.log(req.query);
    res.status(200).json({
      statusCode: 200,
      data: req.body,
    });
  }
);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  //MW NO FOUNY
  next(createHttpError(404));
});

app.listen(port, () => {
  console.log(
    ' App is running at http://localhost:%d in %s mode',
    port,
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});
