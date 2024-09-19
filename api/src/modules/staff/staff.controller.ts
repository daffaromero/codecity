import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { GetStaffDto } from './dto/get-staff.dto';

@Controller({ version: '1', path: 'staffs' })
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async create(@Body() options: CreateStaffDto) {
    const staff = await this.staffService.create(options);
    return { data: staff };
  }

  @Get()
  async findAll(@Query(ValidationPipe) options: GetStaffDto) {
    const { staffs, count, meta } = await this.staffService.findAll(options);
    return { data: staffs, count, meta };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const admin = await this.staffService.findOne({ id });

    return { data: admin };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() options: UpdateStaffDto) {
    const admin = await this.staffService.update(id, options);
    return { data: admin };
  }
}
