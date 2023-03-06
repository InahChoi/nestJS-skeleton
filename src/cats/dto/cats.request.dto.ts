import { PickType } from '@nestjs/swagger';
import { Cat } from './../cats.entity';

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
