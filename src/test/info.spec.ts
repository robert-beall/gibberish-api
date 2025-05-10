import * as chai from 'chai';
import crypto, { CipherInfo } from 'crypto';
import express from 'express';
import infoRouter from '../routes/info.ts';
import chaiHttp, { request } from "chai-http";
import sinon from 'sinon';
import { faker } from '@faker-js/faker';

chai.use(chaiHttp);

const uriPrefix = '/info';
const app = express();
app.use('/info', infoRouter);

const MODES = ['cbc', 'ccm', 'cfb', 'ctr', 'ecb', 'gcm', 'ocb', 'ofb', 'stream', 'wrap', 'xts'];

afterEach(() => {
    sinon.restore();
});

describe('get-ciphers', () => {
    it('SUCCESS', async () => {
        const data = faker.helpers.multiple(() => faker.hacker.noun(), { count: 3 });

        sinon.stub(crypto, 'getCiphers').returns(data);
        request.execute(app).get(`${uriPrefix}/get-ciphers`).end((_err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.eql(data);
        });
    });
});

describe('get-hashes', () => {
    it('SUCCESS', async () => {
        const data = faker.helpers.multiple(() => faker.hacker.noun(), { count: 3 });

        sinon.stub(crypto, 'getHashes').returns(data);
        request.execute(app).get(`${uriPrefix}/get-hashes`).end((_err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.eql(data);
        });
    });
});

describe('get-cipher-info', () => {
    it('SUCCESS', async () => {
        const data = {
            "mode": faker.helpers.arrayElement(MODES),
            "name": faker.hacker.noun(),
            "nid": faker.number.int({ min: 100, max: 999 }),
            "blockSize": faker.number.int({min: 0, max: 16}),
            "ivLength": faker.number.int({min: 0, max: 16}),
            "keyLength": faker.number.int({min: 0, max: 16}),
        } as CipherInfo;

        sinon.stub(crypto, 'getCipherInfo').returns(data);

        request.execute(app).get(`${uriPrefix}/get-cipher-info`).query({name: 'test'}).end((_err, res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body).to.eql(data);
        });
    });

    it('BAD REQUEST', async () => {
        // sinon.stub(crypto, 'getCipherInfo').returns(undefined);

        request.execute(app).get(`${uriPrefix}/get-cipher-info`).end((_err, res) => {
            chai.expect(res).to.have.status(400);
        });
    });

    it('NOT FOUND', async () => {
        sinon.stub(crypto, 'getCipherInfo').returns(undefined);

        request.execute(app).get(`${uriPrefix}/get-cipher-info`).query({name: 'test'}).end((_err, res) => {
            chai.expect(res).to.have.status(404);
        });
    });
})