import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffDto } from './dto/staff.dto';
import { FindManyOptions, FindOptionsWhere, ILike } from 'typeorm';
import { Staff } from './entities/staff.entity';
import {
  NoStaffFoundError,
  StaffAlreadyExistsError,
} from '../../errors/ResourceError';
import { GetStaffDto } from './dto/get-staff.dto';
import { PageMetaDto } from '../../common/dto/page-meta.dto';
import { hashPassword } from '../../helpers/password.helpers';

@Injectable()
export class StaffService {
  async create(options: CreateStaffDto): Promise<Staff> {
    await this.checkDuplicateEmail({
      email: options.email,
    });
    const staff = new Staff();
    staff.staffId = options.staffId;
    staff.firstName = options.firstName;
    staff.lastName = options.lastName;
    staff.email = options.email;
    staff.passwordHash = options.password;
    staff.username = options.username;
    await staff.save();

    const createdStaff = await Staff.findOne({
      where: { id: staff.id },
    });
    return createdStaff;
  }

  async findAll(
    options: GetStaffDto,
  ): Promise<{ staffs: StaffDto[]; count: number; meta: PageMetaDto }> {
    const whereFilters: FindOptionsWhere<Staff> = {};
    if (options.firstName)
      whereFilters.firstName = ILike(`%${options.firstName}%`);
    if (options.email) whereFilters.email = ILike(`%${options.email}%`);

    const [staffs, count] = await Staff.findAndCount({
      where: whereFilters,
      take: options.pageSize,
      skip: options.page * options.pageSize,
    });
    const meta = new PageMetaDto({
      itemCount: count,
      pageOptionsDto: options,
    });
    const staffDto = staffs.map((staff) => new StaffDto(staff));
    return { staffs: staffDto, count, meta };
  }

  async findOne(options: { id: string }): Promise<StaffDto> {
    const staff = await Staff.findOne({
      where: { id: options.id },
    });
    if (!staff) NoStaffFoundError();
    const staffDto = new StaffDto(staff);
    return staffDto;
  }

  async update(id: string, options: UpdateStaffDto): Promise<Staff> {
    const staff = await Staff.findOne({
      where: { id },
    });
    if (!staff) NoStaffFoundError();

    if (options.staffId) staff.staffId = options.staffId;

    if (options.email && options.email !== staff.email) {
      await this.checkDuplicateEmail({ email: options.email });
      staff.email = options.email;
    }

    if (options.username && options.username !== staff.username) {
      staff.username = options.username;
    }

    if (options.password)
      staff.passwordHash = await hashPassword(options.password);

    if (options.firstName) staff.firstName = options.firstName;

    if (options.lastName) staff.lastName = options.lastName;

    await staff.save();

    const updatedStaff = await Staff.findOne({
      where: { id: staff.id },
    });
    return updatedStaff;
  }

  private async checkDuplicateEmail(options: { email?: string }) {
    const findOpts: FindManyOptions<Staff> = {};
    const whereFilters: any[] = [];

    if (options.email) whereFilters.push({ email: ILike(`${options.email}`) });
    findOpts.where = whereFilters;
    const staff = await Staff.findOne(findOpts);
    if (staff) StaffAlreadyExistsError();
    return true;
  }
}
