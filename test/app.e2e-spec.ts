import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/mock (GET)', async () => {
    const testRequest = request(app.getHttpServer()).get('/api/mock');
    const res = await testRequest;

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(25);
    expect(res.body[0].task).toBe('sword');
  });
});
