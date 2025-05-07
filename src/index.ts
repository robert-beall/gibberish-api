import express, { Application } from 'express';
import 'dotenv/config';
import helloRouter from './routes/hello';
import infoRouter from './routes/info';

const app: Application = express();

app.use(helloRouter);
app.use('/info', infoRouter);

app.listen(process.env.PORT, () => {
    console.log(`Gibberish API running on http://localhost:${process.env.PORT}`);
});