import express, { Application } from 'express';
import 'dotenv/config';

const app: Application = express();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(process.env.PORT, () => {
    console.log(`Gibberish API running on http://localhost:${process.env.PORT}`);
});