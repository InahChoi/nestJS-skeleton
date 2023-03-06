import { InternalServerErrorException } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'email',
    required: true,
  })
  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '블루',
    description: 'name',
    required: true,
  })
  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '1004',
    description: 'password',
    required: true,
  })
  @Column()
  @IsNotEmpty()
  @IsString()
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  @Column({ default: null })
  @IsString()
  imgUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  readonly readOnlyData: { id: string; email: string; name: string };
}
