import request from 'supertest';
import express from 'express';
import infoRouter from './info';
import crypto from 'crypto';
import {jest} from '@jest/globals'; 

const app = express();
app.use('/info/', infoRouter);
const uriPrefix = '/info';

describe('get-ciphers', () => {
    jest.mock('crypto');

    test('SUCCESS', async () => {
        // Cast to jest.Mock to enable mock methods
        const getCiphersMock = crypto.getCiphers as jest.Mock<string[], []>;
        getCiphersMock.mockReturnValue(['hello', 'world']);

        const response = await request(app)
        .get(`${uriPrefix}/get-ciphers`)
        .expect("Content-Type", /json/)
        .expect(200);

        expect(response.body).toBeDefined();
    });
});