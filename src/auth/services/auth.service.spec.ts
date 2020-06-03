import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtStrategy } from "../strategies/jwt.strategy";
import { LocalStrategy } from "../strategies/local.strategy";

const USER_MOCK = {
  "id": 66,
  "username": "admin",
  "password": "$2b$10$iql38QAbm7CH7LYLQDBKsu0xx7WU7y9Yrak8rzn4W7cnF8XLaXrWW",
  "name": "admin",
  "email": "admin_Marquardt@gmail.com",
  "createdAt": "2020-05-30T08:40:09.069Z"
}
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN }
      })],
      providers: [
        JwtStrategy,
        LocalStrategy,
        {
          provide: 'USER_SERVICE',
          useValue: {
            send: jest.fn().mockReturnValue({
              toPromise: jest.fn().mockReturnValue(USER_MOCK)
            })
          },
        },
        AuthService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('validateUser', () => {
    it('should return user when username & password are matched', async () => {
      const data = await service.validateUser('admin', 'a@123456!!!');

      expect(data).toEqual(USER_MOCK);
    });

    it('should return null when username & password are not matched', async () => {
      const data = await service.validateUser('admin', 'a@123456!!!x');

      expect(data).toBeNull;
    });

  });


});
