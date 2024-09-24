import { Column, Entity } from 'typeorm';
import { BaseEntityWithUUID } from '../../../common/base.entity';

@Entity()
export class Attendance extends BaseEntityWithUUID {
  @Column()
  staffId: string;

  @Column()
  date: Date;

  @Column()
  clockIn: Date;

  @Column({ nullable: true })
  clockOut: Date;

  @Column({ default: false })
  clockedIn: boolean;
}
