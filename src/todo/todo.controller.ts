import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoAddDTO } from './dto/todoAddDTO';
import { TodoUpdateDTO } from './dto/todoUpdateDTO';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.getTodos();
  }

  @Post('/add')
  addTodo(@Body() todoad: TodoAddDTO) {
    this.todoService.addTodo(todoad);
    return this.todoService.getTodos();
  }

  @Get('/:id')
  getTodoById(@Param() param) {
    return this.todoService.getTodoById(param.id);
  }

  @Delete('/:id')
  deleteTodoById(@Param() param) {
    this.todoService.deleteTodoById(param.id);
    return this.todoService.getTodos();
  }

  @Put('/:id')
  updateTodoById(@Param() param, @Body() todoup: TodoUpdateDTO) {
    return this.todoService.updateTodoById(param.id, todoup);
  }
}
