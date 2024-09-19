import {
  BaseEntity as TOBaseEntity,
  BeforeInsert,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 } from 'uuid';

export class BaseEntity extends TOBaseEntity {
  /**
   * The unique id of the entity.
   */
  @PrimaryGeneratedColumn()
  id: number;
}

export class BaseEntityWithUUID extends TOBaseEntity {
  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  generatedUuid() {
    this.id = v4();
  }
}
