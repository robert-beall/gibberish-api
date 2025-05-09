import { Router } from "express";
import crypto from "crypto";

const infoRouter = Router();

infoRouter.get('/get-ciphers', (_req, res) => {
    res.send(crypto.getCiphers());
});

infoRouter.get('/get-hashes', (_req, res) => {
    res.send(crypto.getHashes());
});

infoRouter.get('/get-curves', (_req, res) => {
    res.send(crypto.getCurves());
});

infoRouter.get('/get-cipher-info', (req, res) => {
    const name = req.query.name as string | undefined;

    if (typeof name === 'undefined') {
        res.status(400).send('Cipher name not provided');
        return; // used because typescript does not recognize res.send(...) like it would a return.
    }

    const info = crypto.getCipherInfo(name);

    if (typeof info === 'undefined') {
        res.status(404).send('Cipher not found');
    }

    res.send(info);
});

export default infoRouter;

