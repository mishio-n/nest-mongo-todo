import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { Todo, TodoDoc } from './model/todo.model';

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

  async update(id: string, updateTodoDto: UpdateTodoDTO): Promise<Todo> {
    const oldTodo = await this.todoModel
      .findOne({ _id: id })
      .exec()
      .catch(error => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    // 完了済みTodoは更新不可
    if (oldTodo.isDone) {
      throw new HttpException(
        'Cannot update todo has been done',
        HttpStatus.FORBIDDEN,
      );
    }
    // updateOne は成否を返すので、更新後にオブジェクトを取得する
    await this.todoModel
      .updateOne({ _id: id }, updateTodoDto)
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

  async undone(id: string): Promise<Todo> {
    const oldTodo = await this.todoModel
      .findOne({ _id: id })
      .exec()
      .catch(error => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    // 未完了Todoをfalseで上書きしても実害はないが、更新日も上書きしてしまうのではじく
    if (!oldTodo.isDone) {
      throw new HttpException('This todo is still open', HttpStatus.FORBIDDEN);
    }

    // updateOne は成否を返すので、更新後にオブジェクトを取得する
    await this.todoModel
      .updateOne({ _id: id }, { isDone: false, updatedAt: new Date() })
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
}
