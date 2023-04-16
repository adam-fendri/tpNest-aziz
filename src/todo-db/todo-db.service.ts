import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { count } from 'console';
import { paginate } from '../helpers/pagination.helper';
import { pageDTO } from '../todo/dto/pageDTO';
import { SearchDTO } from '../todo/dto/searchDTO';
import { StatusDTO } from '../todo/dto/statusDTO';
import { TodoAddDTO } from '../todo/dto/todoAddDTO';
import { TodoUpdateDTO } from '../todo/dto/todoUpdateDTO';
import { TodoEntity } from '../todo/entities/todo.entity';
import { TodoModel } from '../todo/todo.model';
import { TodoStatusEnum } from '../todo/todo.statusenum';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TodoDbService {
  private todos = [];

  constructor(
    @Inject('randomID') private readonly randomID,
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
  async getTodos() {
    return await this.todoRepository.find();
  }
  /**
   *
   * @param todo
   * @returns
   */
  async addTodo(todo: TodoAddDTO) {
    if (todo.description == undefined || todo.name == undefined) {
      return new BadRequestException();
    }

    return await this.todoRepository.save(todo);
  }

  async getTodoById(id: string) {
    const result = await this.todoRepository.findOne({ where: { id } });
    if (result == undefined) {
      // throw new NotFoundException(); pause un probleme et stop api
      return new NotFoundException();
    }
    return result;
  }

  async deleteTodoById(id: string) {
    const result = await this.todoRepository.findOne({ where: { id } });
    if (result == undefined) {
      return new NotFoundException();
    }
    return await this.todoRepository.softDelete(id);
  }

  async restoreSection(id: string) {
    // Problème : un softDeleted Enregistrement ne peut pas être récupéré via l’ORM
    const sectionToRecover = await this.todoRepository.findOne({
      where: { id },
    });
    return await this.todoRepository.restore(id);
  }

  async updateTodoById(id: string, todoup: TodoUpdateDTO) {
    if (
      todoup.description == undefined &&
      todoup.name == undefined &&
      todoup.status == undefined
    ) {
      return new BadRequestException();
    }

    const result = await this.todoRepository.findOne({ where: { id } });
    if (result == undefined) {
      return new NotFoundException();
    } else {
      if (todoup.name != undefined) {
        result.name = todoup.name;
      }
      if (todoup.description != undefined) {
        result.description = todoup.description;
      }
      if (todoup.status != undefined) {
        result.status = todoup.status;
      }
      await this.todoRepository.save(result);
      return this.getTodos();
    }
  }

  async getNBstatus(statuss: StatusDTO) {
    //let status = statuss.status;
    return await this.todoRepository.count({
      where: { status: statuss.status },
    });
  }

  async searchBydescORstatus(search: SearchDTO) {
    if (search.critere == undefined && search.status == undefined) {
      return this.getTodos();
    }
    return await this.todoRepository.find({
      where: [
        { name: Like('%' + search.critere + '%') },
        { description: Like('%' + search.critere + '%') },
        { status: search.status },
      ],
    });
  }

  async searchBydescANDstatus(
    search: SearchDTO,
    page: pageDTO,
  ): Promise<TodoEntity[]> {
    let queryBuilder = this.todoRepository
      .createQueryBuilder('todo')
      .select('*');
    if (search.critere != undefined) {
      queryBuilder
        .where('todo.description like :critere ', {
          critere: `%${search.critere}%`,
        })
        .orWhere('todo.name like :critere ', {
          critere: `%${search.critere}%`,
        });
    }
    if (search.status != undefined) {
      queryBuilder.andWhere('todo.status LIKE :sts', {
        sts: `%${search.status}%`,
      });
    }

    queryBuilder = paginate(queryBuilder, page.page, page.nb);
    const results = await queryBuilder.getRawMany();
    if (page.page > 1 && results.length == 0) {
      throw new NotFoundException('pageNotfound');
    }

    return results;
  }
}
