import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ValidationPipe,
  Put,
  Req,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { GetStaffDto } from './dto/get-staff.dto';
import { Request } from 'express';

@Controller({ version: '1', path: 'staff' })
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async create(@Body() options: CreateStaffDto) {
    const staff = await this.staffService.create(options);
    return { data: staff };
  }

  @Get()
  async findAll(@Query(ValidationPipe) options: GetStaffDto) {
    const { staffMany, count, meta } = await this.staffService.findAll(options);
    return { data: staffMany, count, meta };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const admin = await this.staffService.findOne({ id });

    return { data: admin };
  }

  @Put(':id')
  async update(
    @Req() request: Request,
    @Param('id') id: string,
    @Body() options: UpdateStaffDto,
  ) {
    const currentStaffId = request.user.id;
    console.log('request', request.user);
    const staff = await this.staffService.update(currentStaffId, id, options);
    return { data: staff };
  }
}
