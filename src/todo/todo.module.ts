import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoSchema } from 'src/todo/schema/todo.schema';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { IdTransformInterceptor } from './interceptor/id-transform.interceptor';

@Module({
  controllers: [TodoController],
  providers: [TodoService, IdTransformInterceptor],
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
})
export class TodoModule {}
