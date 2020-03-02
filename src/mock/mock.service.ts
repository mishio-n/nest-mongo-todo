import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDTO } from 'src/todo/dto/create-todo.dto';
import { UpdateTodoDTO } from 'src/todo/dto/update-todo.dto';
import { Todo } from 'src/todo/shared/todo.model';
import { dummy } from './dummy';

@Injectable()
export class MockService {
  async findAll(sortKey: string = 'createdAt', order: number): Promise<Todo[]> {
    return dummy.sort((a, b) => {
      if (a[sortKey] > b[sortKey]) {
        return order;
      }
      if (a[sortKey] < b[sortKey]) {
        return -order;
      }
      return 0;
    });
  }

  async findByUser(
    user: string,
    sortKey: string = 'createdAt',
    order: number,
  ): Promise<Todo[]> {
    return dummy
      .filter(d => d.user === user)
      .sort((a, b) => {
        if (a[sortKey] > b[sortKey]) {
          return order;
        }
        if (a[sortKey] < b[sortKey]) {
          return -order;
        }
        return 0;
      });
  }

  async create(createTodoDto: CreateTodoDTO): Promise<Todo> {
    return {
      ...createTodoDto,
      id: `${new Date()}`,
      createdAt: `${new Date()}`,
      updatedAt: `${new Date()}`,
      isDone: false,
      deadline: `${createTodoDto.deadline}`,
    };
  }

  async update(id: string, updateTodoDto: UpdateTodoDTO): Promise<Todo> {
    const data = dummy.find(d => d.id === id);
    if (!data) {
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (data.isDone) {
      throw new HttpException('', HttpStatus.FORBIDDEN);
    }

    return {
      ...data,
      ...updateTodoDto,
      deadline: `${updateTodoDto.deadline}`,
      updatedAt: `${new Date()}`,
    };
  }

  async delete(
    id: string,
  ): Promise<Partial<{ n: number; ok: number; deletedCount: number }>> {
    const deleted = dummy.filter(d => d.id !== id);
    const length = dummy.length - deleted.length;

    return { deletedCount: length };
  }

  async undone(id: string): Promise<Todo> {
    const data = dummy.find(d => d.id === id);
    if (!data) {
      throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!data.isDone) {
      throw new HttpException('', HttpStatus.FORBIDDEN);
    }

    return {
      ...data,
      isDone: false,
      updatedAt: `${new Date()}`,
    };
  }
}
