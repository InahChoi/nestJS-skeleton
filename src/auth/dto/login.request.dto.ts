import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats/cats.entity';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
