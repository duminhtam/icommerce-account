import { Injectable, Inject, Logger, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private readonly client: ClientProxy,
    private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.client.send({ service: 'user', cmd: 'get' }, { username })
      .toPromise();

      // Logger.debug(user, 'validateUser')
      if(password && user?.password && compareSync(password, user?.password)) {
        return user;
      }

      return null;
    } catch(e) {
      Logger.error(e);
      throw e;
    }
  }

  async sign(user) {
    if(!user){
      throw new UnauthorizedException
    }
    const payload = { user, sub: user.id};

    Logger.debug(user, 'sign')
    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload)
    };
  }

  validateToken(jwt: string) {
    Logger.debug(jwt, 'validateToken')
    return this.jwtService.verify(jwt);
  }
}
