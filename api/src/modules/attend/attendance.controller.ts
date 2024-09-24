import {
  Controller,
  Post,
  Param,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { ClockInDto } from './dto/clock-in.dto';
import { ClockOutDto } from './dto/clock-out.dto';
import { GetAttendanceStatusDto } from './dto/get-attend-status.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/auth.guard';

@Controller({ version: '1', path: 'attendance' })
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('clock-in/:staffId')
  async clockIn(@Req() request: Request, @Param('staffId') staffId: string) {
    const currentId = request.user.id;
    const options: ClockInDto = { staffId };
    const attendance = await this.attendanceService.clockIn(currentId, options);
    return { data: attendance };
  }

  @UseGuards(JwtAuthGuard)
  @Post('clock-out/:staffId')
  async clockOut(@Req() request: Request, @Param('staffId') staffId: string) {
    const currentId = request.user.id;
    const options: ClockOutDto = { staffId };
    const attendance = await this.attendanceService.clockOut(
      currentId,
      options,
    );
    return { data: attendance };
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  async getAllAttendances(@Query() options: GetAttendanceStatusDto) {
    const attendance = await this.attendanceService.getAllAttendances(options);
    return { data: attendance };
  }

  @UseGuards(JwtAuthGuard)
  @Get('check/:staffId')
  async getOneEmployeeAttendance(
    @Req() request: Request,
    @Param('staffId') staffId: string,
    @Query() options: GetAttendanceStatusDto,
  ) {
    const currentId = request.user.id;
    const attendance = await this.attendanceService.getOneEmployeeAttendance(
      staffId,
      currentId,
      options,
    );
    return { data: attendance };
  }
}
