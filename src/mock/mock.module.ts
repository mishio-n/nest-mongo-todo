import { Module } from '@nestjs/common';
import { MockService } from './mock.service';
import { MockController } from './mock.controller';
import { TransformInterceptor } from 'src/todo/interceptor/transform.interceptor';
import { UpdateDoneTodoGuard } from 'src/todo/guard/update-done-todo.guard';

@Module({
  controllers: [MockController],
  providers: [MockService, TransformInterceptor, UpdateDoneTodoGuard],
})
export class MockModule {}
