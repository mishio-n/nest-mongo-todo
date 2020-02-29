import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDoc } from './model/todo.model';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel('Todo') private readonly todoModel: Model<TodoDoc>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel
      .find()
      .exec()
      .catch(error => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async findByUser(user: string): Promise<Todo[]> {
    return this.todoModel
      .find({ user: `${user}` })
      .exec()
      .catch(error => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async create(createTodoDto: CreateTodoDTO): Promise<Todo> {
    const createTodo = new this.todoModel(createTodoDto);
    return createTodo.save().catch(error => {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  async update(id: string, todo: UpdateTodoDTO): Promise<Todo> {
    // updateOne は成否を返すので、更新後のオブジェクト
    await this.todoModel
      .updateOne({ _id: id }, todo)
      .exec()
      .catch(error => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return this.todoModel
      .findOne({ _id: id })
      .exec()
      .catch(error => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  async delete(
    id: string,
  ): Promise<Partial<{ n: number; ok: number; deletedCount: number }>> {
    return this.todoModel
      .deleteOne({ _id: `${id}` })
      .exec()
      .catch(error => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
}
