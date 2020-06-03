import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Transport } from '@nestjs/microservices';
import { getConnection } from 'typeorm';
import { AllExceptionsFilter } from '../src/all-exceptions.filter';

describe('Accounts Service (e2e)', () => {
  let app: INestApplication;
  beforeAll(async (done) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new AllExceptionsFilter());

    app.connectMicroservice({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: parseInt(
          process.env.USER_SERVICE_PORT
          ,10)
      }
    });

    app.connectMicroservice({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: parseInt(
          process.env.AUTH_SERVICE_PORT
          ,10)
      }
    });
    await app.startAllMicroservicesAsync();
    await app.init();
    // Drop DB before test
    await getConnection().synchronize(true);
    done()
  });

  afterAll(async () => {
    await getConnection().close();
    await app.close();
  });

  describe('AuthModule', () => {
    it('Should return status 201 after create account success', async () => {
      const payload = {
        "username": "admin",
        "email": "admin@gmail.com",
        "name": "admin",
        "password": "a@123456!!!"
      };
      const data = await request(app.getHttpServer())
        .post('/user')
        .send(payload)
        .expect(201)

      expect(data.body).toEqual({
        data: expect.any(Object),
        message: "User created",
      });
    });

    it('Should return status 201 after login success', async () => {
      const payload = {
        "username": "admin",
        "password": "a@123456!!!"
      };
      const data = await request(app.getHttpServer())
        .post('/auth/login')
        .send(payload)
        .expect(201)

      expect(data.body).toEqual({
        userId: expect.any(Number),
        accessToken: expect.any(String),
      });
    });

    it('Should return status 401 after login failed', async () => {
      const payload = {
        "username": "adminx",
        "password": "a@123456!!!xxx"
      };
      const data = await request(app.getHttpServer())
        .post('/auth/login')
        .send(payload)
        .expect(401)

      expect(data.body).toEqual({

        status: 401,
        error: "Unauthorized",
        timestamp: expect.any(String),
        path: "/auth/login"
      });
    });
  });
});
