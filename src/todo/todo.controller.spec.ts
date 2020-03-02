import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { UpdateDoneTodoGuard } from './guard/update-done-todo.guard';
import { TodoService } from './todo.service';
import { DummyDataService } from '../../test/mock/dummy';

describe('Todo Controller', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TransformInterceptor,
        UpdateDoneTodoGuard,
        { provide: TodoService, useValue: DummyDataService },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/api/todo', () => {
    expect(controller.findAll());
  });
});
