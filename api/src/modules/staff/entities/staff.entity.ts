import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntityWithUUID } from '../../../common/base.entity';
import { hashPassword } from '../../../helpers/password.helpers';
import { Exclude } from 'class-transformer';

@Entity()
export class Staff extends BaseEntityWithUUID {
  @Column()
  staffId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  passwordHash: string;

  @Exclude()
  @Column({ nullable: true })
  accessToken: string;

  @Column({ unique: true })
  username: string;

  @BeforeInsert()
  async hashUserPassword() {
    if (this.passwordHash) {
      this.passwordHash = await hashPassword(this.passwordHash);
    }
  }
}
