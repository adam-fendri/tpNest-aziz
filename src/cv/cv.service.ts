import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepo: Repository<Cv>,
  ) {}

  async create(createCvDto: CreateCvDto) {
    const cv = this.cvRepo.create(createCvDto);
    return await this.cvRepo.save(cv);
  }

  async addCv(cv: Cv) {
    return await this.cvRepo.save(cv);
  }

  async findAll() {
    return await this.cvRepo.find();
  }

  async findOne(id: number) {
    return await this.cvRepo.findOneBy({ id: id });
  }

  async update(id: number, updateCvDto: UpdateCvDto) {
    return await this.cvRepo.update(id, updateCvDto);
  }

  async remove(id: number) {
    return await this.cvRepo.delete(id);
  }
}
