import { Router } from "express";
import crypto from "crypto";

const infoRouter = Router();

infoRouter.get('/get-ciphers', (_req, res) => {
    res.send(crypto.getCiphers());
});

infoRouter.get('/get-hashes', (_req, res) => {
    res.send(crypto.getHashes());
});

export default infoRouter;

