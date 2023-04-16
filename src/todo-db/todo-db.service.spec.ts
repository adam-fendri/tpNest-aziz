import { Test, TestingModule } from '@nestjs/testing';
import { TodoDbService } from './todo-db.service';

describe('TodoDbService', () => {
  let service: TodoDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoDbService],
    }).compile();

    service = module.get<TodoDbService>(TodoDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
