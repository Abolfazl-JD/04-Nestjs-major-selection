import { Module } from '@nestjs/common';
import { MajorsController } from './majors.controller';
import { MajorsService } from './majors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Major } from './major.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Major ])],
  controllers: [MajorsController],
  providers: [MajorsService]
})
export class MajorsModule {}
