import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, FindConditions } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    // @Inject(process.env.USER_SERVICE_NAME)
    // private readonly client: ClientProxy,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOne(query: FindConditions<User>): Promise<User> {
    return await this.userRepository.findOne(query);
  }

  async createUser(user: any): Promise<object> {
    const userEntity: User[] = this.userRepository.create(user);
    const insertData: InsertResult = await this.userRepository.insert(userEntity);

    const userData: User = await this.userRepository.findOne({id: insertData.identifiers[0].id});

    Logger.debug(userData, 'createUser');
    return {
      message: 'User created',
      data: userData
    };
  }
}
