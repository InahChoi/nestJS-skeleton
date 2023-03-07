import { CatsRepository } from './../../cats/cats.repository';
import { Payload } from './jwt.payload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      // 헤더에 토큰으로 부터 추출
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 환경변수로 저장
      secretOrKey: 'secret',
      // 만료 기간
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatById(payload.sub);

    if (cat) {
      return cat;
    } else {
      throw new UnauthorizedException();
    }
  }
}
