import express, { Application } from 'express';
import 'dotenv/config';
import helloRouter from './routes/hello';

const app: Application = express();

app.use(helloRouter);

app.listen(process.env.PORT, () => {
    console.log(`Gibberish API running on http://localhost:${process.env.PORT}`);
});