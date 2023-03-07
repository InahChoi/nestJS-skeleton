import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cats.entity';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectRepository(Cat) private catsRepository: Repository<Cat>) {}

  async findCatById(catId: string): Promise<Cat | null> {
    const cat = await this.catsRepository.findOne({ where: { id: catId } });
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catsRepository.findOne({ where: { email } });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catsRepository.findOne({
      where: { email: email },
    });
    if (result) {
      return true;
    } else {
      return false;
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return this.catsRepository.save(cat);
  }
}
