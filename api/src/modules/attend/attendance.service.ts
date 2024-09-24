import { Injectable } from '@nestjs/common';
import { ClockInDto } from './dto/clock-in.dto';
import { GetAttendanceStatusDto } from './dto/get-attend-status.dto';
import { Attendance } from './entities/attendance.entity';
import { ClockOutDto } from './dto/clock-out.dto';
import {
  NoAttendancesFoundError,
  NoStaffFoundError,
  NotAllowedError,
} from 'src/errors/ResourceError';
import { DataSource } from 'typeorm';
import { Staff } from '../staff/entities/staff.entity';

@Injectable()
export class AttendanceService {
  constructor(private dataSource: DataSource) {}

  async clockIn(currentId: string, options: ClockInDto): Promise<Attendance> {
    const staff = await Staff.findOne({
      where: { id: currentId },
    });

    if (!staff) {
      NoStaffFoundError();
    }

    if (staff.staffId !== options.staffId) {
      NotAllowedError();
    }

    const attendance = new Attendance();
    attendance.staffId = options.staffId;
    attendance.clockIn = new Date();
    attendance.clockedIn = true;
    attendance.date = new Date(new Date().setHours(0, 0, 0, 0));
    await attendance.save();

    const createdAttendance = await Attendance.findOne({
      where: { staffId: attendance.staffId, clockIn: attendance.clockIn },
    });
    return createdAttendance;
  }

  async clockOut(currentId: string, options: ClockOutDto): Promise<Attendance> {
    const staff = await Staff.findOne({
      where: { id: currentId },
    });

    if (!staff) {
      NoStaffFoundError();
    }

    if (staff.staffId !== options.staffId) {
      NotAllowedError();
    }

    const latestAttendance = await Attendance.findOne({
      where: { staffId: options.staffId, clockOut: null, clockedIn: true },
      order: { clockIn: 'DESC' },
    });

    if (!latestAttendance) {
      NoAttendancesFoundError();
    }

    latestAttendance.clockOut = new Date();
    latestAttendance.clockedIn = false;
    await latestAttendance.save();

    const updatedAttendance = await Attendance.findOne({
      where: { id: latestAttendance.id },
    });
    return updatedAttendance;
  }

  async getAllAttendances(
    options: GetAttendanceStatusDto,
  ): Promise<Attendance[]> {
    const attendanceRepository = this.dataSource.getRepository(Attendance);
    const queryBuilder = attendanceRepository.createQueryBuilder('attendance');

    if (options.staffId) {
      queryBuilder.andWhere('attendance.staffId = :staffId', {
        staffId: options.staffId,
      });
    }
    if (options.date) {
      queryBuilder.andWhere('attendance.date = :date', { date: options.date });
    }
    if (options.clockIn) {
      queryBuilder.andWhere('attendance.clockIn = :clockIn', {
        clockIn: options.clockIn,
      });
    }
    if (options.clockedIn !== undefined) {
      queryBuilder.andWhere('attendance.clockedIn = :clockedIn', {
        clockedIn: options.clockedIn,
      });
    }

    queryBuilder.orderBy('attendance.date', 'DESC');

    const attendances = await queryBuilder.getMany();

    if (!attendances.length) {
      NoAttendancesFoundError();
    }

    return attendances;
  }

  async getOneEmployeeAttendance(
    staffId: string,
    currentId: string,
    options: GetAttendanceStatusDto,
  ): Promise<Attendance[]> {
    const staff = await Staff.findOne({
      where: { id: currentId },
    });

    console.log(staff);

    if (!staff) {
      NoStaffFoundError();
    }

    if (staff.staffId !== staffId) {
      NotAllowedError();
    }

    const attendanceRepository = this.dataSource.getRepository(Attendance);
    const queryBuilder = attendanceRepository.createQueryBuilder('attendance');

    if (options.date) {
      queryBuilder.andWhere('attendance.date = :date', { date: options.date });
    }
    if (options.clockIn) {
      queryBuilder.andWhere('attendance.clockIn = :clockIn', {
        clockIn: options.clockIn,
      });
    }

    if (options.clockedIn !== undefined) {
      queryBuilder.andWhere('attendance.clockedIn = :clockedIn', {
        clockedIn: options.clockedIn,
      });
    }

    queryBuilder.orderBy('attendance.date', 'DESC');

    const attendances = await queryBuilder.getMany();

    if (!attendances.length) {
      NoAttendancesFoundError();
    }

    return attendances;
  }
}
