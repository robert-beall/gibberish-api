import { Router } from "express";

const helloRouter = Router();

helloRouter.get('/', (_req, res) => {
    res.send('Hello World');
});

export default helloRouter;