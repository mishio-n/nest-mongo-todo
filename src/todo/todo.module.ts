import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from 'src/todo/shared/todo.schema';
import { UpdateDoneTodoGuard } from './guard/update-done-todo.guard';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [TodoService, TransformInterceptor, UpdateDoneTodoGuard],
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
})
export class TodoModule {}
