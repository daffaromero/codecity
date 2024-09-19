import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Inject,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthLogin } from './dto/login-payload.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Public } from '../../decorators/public.decorator';

@Controller({ version: '1', path: 'auth' })
export class AuthController {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: AuthLogin,
    description: 'User info with access token',
  })
  async login(@Body() userLoginDto: UserLoginDto) {
    const login = await this.authService.login(userLoginDto);

    return { data: login };
  }

  @Get('/selfUser')
  @UseGuards(JwtAuthGuard)
  async selfUser(@Req() req: Request) {
    const self = await this.authService.self({
      id: String(req.user?.id),
    });

    return { data: self };
  }

  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: Request) {
    await this.authService.logout({
      id: String(req.user?.id),
    });

    return {
      data: {
        message: 'Logout successfully',
      },
    };
  }
}
