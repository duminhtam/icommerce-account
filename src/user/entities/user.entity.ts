import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert, Unique,
  Index
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { hash } from 'bcrypt';
import { IsEmail, IsNotEmpty } from 'class-validator';

export interface UserInterface {
  id: number
  username: string
  password: string
  name: string
  email: string
}

@Entity()
@Unique(['username'])
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  @Index('IDX_username', { unique: true })
  username: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Column()
  @IsEmail()
  @Index('IDX_email', { unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
