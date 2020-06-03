import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';

const MOCK_SIGN = {
  "userId": 1,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2NiwidXNlcm5hbWUiOiJhZG1pbiIsInBhc3N3b3JkIjoiJDJiJDEwJGlxbDM4UUFibTdDSDdMWUxRREJLc3UweHg3V1U3eTlZcmFrOHJ6bjRXN2NuRjhYTGFYcldXIiwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbl9NYXJxdWFyZHRAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMC0wNS0zMFQwODo0MDowOS4wNjlaIn0sInN1YiI6NjYsImlhdCI6MTU5MDkxNTgzMywiZXhwIjoxNTkwOTE5NDMzfQ.3xDbpZAzNY29JCDOhrjeqlDBWm_hwc8Irju5-_mf8X4"
};

describe('Auth Controller', () => {
  let controller: AuthController;
  let service: AuthService;
  beforeEach(async () => {


    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            sign: jest
              .fn()
              .mockReturnValue(MOCK_SIGN)
          },
        },
      ],
    })
    .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('Login', () => {
    it('should return accessToken when login success', async () => {
      const data = await controller.authLogin(null);
      expect(data.userId).toEqual(1);
    });

    it('should return null when login failed', async () => {
      jest
        .spyOn(service, 'sign')
        .mockResolvedValueOnce(null)

      const data = await controller.authLogin(null);


      expect(data).toBeNull();
    });
  });
});
