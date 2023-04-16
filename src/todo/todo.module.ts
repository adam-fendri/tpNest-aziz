import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoDbController } from '../todo-db/todo-db.controller';
import { TodoDbService } from '../todo-db/todo-db.service';
import { TodoEntity } from './entities/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController, TodoDbController],
  providers: [TodoService, TodoDbService],
})
export class TodoModule {}
