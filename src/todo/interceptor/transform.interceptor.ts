import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo, TodoDoc } from '../model/todo.model';
import * as moment from 'moment';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
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

// Document を継承ているため、
// class-transformer を使わずに変換する
function transform(doc: TodoDoc): Todo {
  return {
    // プロパティ名を変更
    id: doc._id,
    task: doc.task,
    user: doc.user,
    memo: doc.memo,
    deadline: moment(new Date(doc.deadline)).format('YYYY-MM-DD HH:mm:ss'),
    isDone: doc.isDone,
    createdAt: moment(new Date(doc.createdAt)).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(new Date(doc.updatedAt)).format('YYYY-MM-DD HH:mm:ss'),
  };
}
