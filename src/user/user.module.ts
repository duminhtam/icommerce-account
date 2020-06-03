import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([{
      name: 'USER_SERVICE',
      transport: Transport.TCP,
      options: {
        host: process.env.USER_SERVICE_HOST,
        port: parseInt(
          process.env.USER_SERVICE_PORT
          ,10)
      }
    }])
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
