import express, { Application } from 'express';

const sum = (a: number, b: number): number => {
  return a + b;
};

const app: Application = express();
const port: number = 5000;

// |
// |
// v
// app.get('/ping', (req, res) => {});
// src/index.ts:7:19 - error TS6133: 'req' is declared but its value is never read.
//  Para evitar este tipo de error en tiempo de compilacion se le agrega una _ adelanta de la variable
app.get('/ping', (_req, res) => {
    console.log(_req.params);
  res.json({
    statusCode: 200,
    data: { status: 'ok' },
  });
});


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

app.listen(port, () => {
  console.log(
    ' App is running at http://localhost:%d in %s mode',
    port,
    app.get('env')
  );
  console.log('  Press CTRL-C to stop\n');
});
