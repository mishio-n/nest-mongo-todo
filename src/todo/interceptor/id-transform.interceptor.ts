import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo, TodoDoc } from '../model/todo.model';

@Injectable()
export class IdTransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Todo | Todo[]> {
    return next
      .handle()
      .pipe(
        map(doc =>
          Array.isArray(doc)
            ? doc.map(data => transform(data))
            : transform(doc),
        ),
      );
  }
}

/**
 * _id を id に変更する
 * TodoDoc は mongoose の Document を継承しているため、class-transformer だと不要なプロパティが入る
 */
function transform(doc: TodoDoc): Todo {
  return {
    id: doc._id,
    task: doc.task,
    user: doc.user,
    memo: doc.memo,
    deadline: doc.deadline,
    isDone: doc.isDone,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}
