import { Module } from '@nestjs/common';
import { UpdateDoneTodoGuard } from '../todo/guard/update-done-todo.guard';
import { TransformInterceptor } from '../todo/interceptor/transform.interceptor';
import { MockController } from './mock.controller';
import { MockService } from './mock.service';

@Module({
  controllers: [MockController],
  providers: [MockService, TransformInterceptor, UpdateDoneTodoGuard],
})
export class MockModule {}
