import { PositiveIntPipe } from './../common/pipes/positivelnt.pipe';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  //* cats/
  @Get()
  @UseFilters(HttpExceptionFilter)
  getAllCat() {
    return 'all cat';
  }

  //* cats/:_id
  @Get(':_id')
  getOneCat(@Param('_id', ParseIntPipe, PositiveIntPipe) param: number) {
    console.log(param);
    return 'one cat';
  }

  //* cats/
  @Post()
  createCat() {
    return 'create cat';
  }

  //* cats/:_id
  @Put(':_id')
  updateCat() {
    return 'update cat';
  }

  //* cats/:_id
  @Patch(':_id')
  updatePartialCat() {
    return 'get partial update cat';
  }

  //* cats/:_id
  @Delete(':_id')
  deleteCat() {
    return 'delete cat';
  }
}
