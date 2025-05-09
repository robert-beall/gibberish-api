import request from 'supertest';
import express from 'express';
import infoRouter from './info';
import crypto from 'crypto';

const uriPrefix = '/info';
const app = express();

beforeAll(() => {
    app.use('/info/', infoRouter);
    jest.mock('crypto');
});

beforeEach(() => {
    jest.clearAllMocks();
})

describe('get-ciphers', () => {
    test('SUCCESS', async () => {
        crypto.getCiphers = jest.fn();
        (crypto.getCiphers as jest.Mock).mockReturnValue(['hello', 'world']);
        const response = await request(app)
        .get(`${uriPrefix}/get-ciphers`)
        .expect("Content-Type", /json/)
        .expect(200);

        expect(response.body).toBeDefined();
    });
});

describe('get-hashes', () => {
    test('SUCCESS', async () => {
        crypto.getHashes = jest.fn();
        (crypto.getHashes as jest.Mock).mockReturnValue(['hello', 'world']);
        const response = await request(app)
        .get(`${uriPrefix}/get-hashes`)
        .expect("Content-Type", /json/)
        .expect(200);

        expect(response.body).toBeDefined();
    });
});