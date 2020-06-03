import { Controller, Post, UseGuards, Request, Logger, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import * as get from "lodash.get";

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JWTAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';


@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async authLogin(@Request() req) {
    const user = get(req, 'user')
    return this.authService.sign(user);
  }

  @UseGuards(JWTAuthGuard)
  @Get('auth/info')
  async authInfo(@Request() req) {
    return req.user;
  }

  // Use for other service validate token
  @MessagePattern({ service: 'auth', cmd: 'check'})
  async authCheck(data) {
    try {
      const res = this.authService.validateToken(data.jwt);

      Logger.debug(data)
      return res;
    } catch(e) {
      Logger.error(e);
      return false;
    }
  }
}
