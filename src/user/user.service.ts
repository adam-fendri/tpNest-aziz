import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from '../cv/entities/cv.entity';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async addUser(user: User) {
    return await this.userRepo.save(user);
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findOne(id: number) {
    return await this.userRepo.findOneBy({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.userRepo.delete(id);
  }
}
