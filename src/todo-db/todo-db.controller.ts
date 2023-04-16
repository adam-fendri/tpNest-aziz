import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SearchDTO } from '../todo/dto/searchDTO';
import { StatusDTO } from '../todo/dto/statusDTO';
import { TodoAddDTO } from '../todo/dto/todoAddDTO';
import { TodoUpdateDTO } from '../todo/dto/todoUpdateDTO';
import { TodoDbService } from './todo-db.service';
import { query } from 'express';
import { pageDTO } from '../todo/dto/pageDTO';

@Controller('todo-db')
export class TodoDbController {
  constructor(private todoDbService: TodoDbService) {}

  @Get()
  getTodos(@Query() search: SearchDTO, @Query() page: pageDTO) {
    return this.todoDbService.searchBydescANDstatus(search, page);
    //return this.todoDbService.getTodos();
  }

  @Get('/status')
  getnbstatus(@Body() status: StatusDTO) {
    return this.todoDbService.getNBstatus(status);
  }
  @Get('/search')
  searchBydes(@Query() search: SearchDTO) {
    return this.todoDbService.searchBydescORstatus(search);
  }

  @Post('/add')
  addTodo(@Body() todoad: TodoAddDTO) {
    this.todoDbService.addTodo(todoad);
    return this.todoDbService.getTodos();
  }

  @Get('/:id')
  getTodoById(@Param() param) {
    return this.todoDbService.getTodoById(param.id);
  }

  @Delete('/:id')
  deleteTodoById(@Param() param) {
    return this.todoDbService.deleteTodoById(param.id);
    return this.todoDbService.getTodos();
  }
  @Put('/restore/:id')
  restoreTodoById(@Param() param) {
    this.todoDbService.restoreSection(param.id);
    return this.todoDbService.getTodos();
  }

  @Put('/:id')
  updateTodoById(@Param() param, @Body() todoup: TodoUpdateDTO) {
    return this.todoDbService.updateTodoById(param.id, todoup);
  }
}
