import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';

import { genSalt, hash, compare } from 'bcrypt';
import { Task } from 'src/tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(
    () => Task,
    task => task.user,
    { eager: true },
  )
  tasks: Task[];

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
