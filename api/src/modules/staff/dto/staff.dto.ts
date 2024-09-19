import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { Resource } from 'src/common/resource';
import { Staff } from '../entities/staff.entity';

export class StaffDto extends Resource {
  @IsString()
  username: string;

  @IsString()
  staffId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  fullName: string;

  @IsString()
  email: string;

  @Exclude()
  passwordHash: string;

  @Exclude()
  accessToken: string;

  constructor(partial: Partial<Staff>) {
    super();
    this.fullName = partial?.firstName + ' ' + partial?.lastName;
    Object.assign(this, partial);
  }
}
