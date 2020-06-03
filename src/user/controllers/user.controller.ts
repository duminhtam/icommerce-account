import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { MessagePattern } from '@nestjs/microservices';
import { User } from '../entities/user.entity';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @MessagePattern({ service: 'user', cmd: 'get' })
  getUser(data: any): Promise<User> {
    return this.userService.findOne({ username: data.username });
  }

  @Post('user')
  createUser(@Body() body: User): Promise<any> {
    return this.userService.createUser(body);
  }
}
