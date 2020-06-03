import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity'

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOne: jest
              .fn()
              .mockImplementation(({ username }) => {
                const user = new User()
                user.id = 1;
                user.username = username;
                user.password = username;
                user.name = username;
                user.email = `${username}@gmail.com`;
                return Promise.resolve(user)
          }),
            // delete: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Microservice message pattern', () => {
    it('should return user when username is found', async () => {
      const data = await controller.getUser({
        username: 'admin'
      });

      expect(data).toBeInstanceOf(User);
      expect(data.id).toEqual(1)
      expect(data.name).toEqual('admin')
      expect(data.username).toEqual('admin')
    });

    it('should return null when username is not found', async () => {
      const findOneSpy = jest
        .spyOn(service, 'findOne')
        .mockResolvedValueOnce(null);

      const data = await controller.getUser({
        username: 'adminnotfound'
      });

      expect(data).toBeNull();
      expect(findOneSpy).toBeCalledWith({username: 'adminnotfound'});
    });
  });


  // describe('deleteCat', () => {
  //   it('should return that it deleted a cat', () => {
  //     expect(controller.deleteCat('a uuid that exists')).resolves.toEqual({
  //       deleted: true,
  //     });
  //   });
  //   it('should return that it did not delete a cat', () => {
  //     const deleteSpy = jest
  //       .spyOn(service, 'deleteOne')
  //       .mockResolvedValueOnce({ deleted: false });
  //     expect(
  //       controller.deleteCat('a uuid that does not exist'),
  //     ).resolves.toEqual({ deleted: false });
  //     expect(deleteSpy).toBeCalledWith('a uuid that does not exist');
  //   });
  // });

});
