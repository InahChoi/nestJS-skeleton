import { CatsRepository } from './cats.repository';
import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}
  async signUp({ email, name, password }: CatRequestDto) {
    const isCatExist = await this.catsRepository.existsByEmail(email);
    if (isCatExist) {
      throw new UnauthorizedException('There is a cat with that email already');
    }
    const cat = await this.catsRepository.create(
      // create 과정에서 비밀번호가 @BeforeInsert를 거쳐 단방향 암호화로 리턴 된 후 save 된다.
      // create == 객체 생성 / DB 직접 저장 X
      // save == DB 직접 저장
      { email, name, password },
    );
    return { id: cat.id, email: cat.email, name: cat.name };
  }
}
