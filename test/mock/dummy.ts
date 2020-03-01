import { Todo } from '../../src/todo/model/todo.model';
import { CreateTodoDTO } from '../../src/todo/dto/create-todo.dto';
import { UpdateTodoDTO } from '../../src/todo/dto/update-todo.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

export const dummy: Todo[] = [
  {
    id: '1996red',
    task: 'red',
    user: 'kanto',
    memo: 'Charizard',
    deadline: '1996-02-27 00:00:00',
    isDone: true,
    createdAt: '1996-02-27 00:00:00',
    updatedAt: '1996-02-27 00:00:00',
  },
  {
    id: '1996green',
    task: 'green',
    user: 'kanto',
    memo: 'Venusaur',
    deadline: '1996-02-27 00:00:00',
    isDone: true,
    createdAt: '1996-02-27 00:00:00',
    updatedAt: '1996-02-27 00:00:00',
  },
  {
    id: '1996blue',
    task: 'blue',
    user: 'kanto',
    memo: 'Blastoise',
    deadline: '1996-10-15 00:00:00',
    isDone: true,
    createdAt: '1996-10-15 00:00:00',
    updatedAt: '1996-10-15 00:00:00',
  },
  {
    id: '1998yellow',
    task: 'yellow',
    user: 'kanto',
    memo: 'Pikachu',
    deadline: '1998-09-12 00:00:00',
    isDone: true,
    createdAt: '1998-09-12 00:00:00',
    updatedAt: '1998-09-12 00:00:00',
  },
  {
    id: '1999gold',
    task: 'gold',
    user: 'johto',
    memo: 'Ho-Oh',
    deadline: '1999-11-21 00:00:00',
    isDone: true,
    createdAt: '1999-11-21 00:00:00',
    updatedAt: '1999-11-21 00:00:00',
  },

  {
    id: '1999silver',
    task: 'silver',
    user: 'johto',
    memo: 'Lugia',
    deadline: '1999-11-21 00:00:00',
    isDone: true,
    createdAt: '1999-11-21 00:00:00',
    updatedAt: '1999-11-21 00:00:00',
  },
  {
    id: '2000crystal',
    task: 'crystal',
    user: 'johto',
    memo: 'Suicune',
    deadline: '2000-12-14 00:00:00',
    isDone: true,
    createdAt: '2000-12-14 00:00:00',
    updatedAt: '2000-12-14 00:00:00',
  },
  {
    id: '2002ruby',
    task: 'ruby',
    user: 'hoenn',
    memo: 'Groudon',
    deadline: '2002-11-21 00:00:00',
    isDone: true,
    createdAt: '2002-11-21 00:00:00',
    updatedAt: '2002-11-21 00:00:00',
  },
  {
    id: '2002sapphire',
    task: 'sapphire',
    user: 'hoenn',
    memo: 'Kyogre',
    deadline: '2002-11-21 00:00:00',
    isDone: true,
    createdAt: '2002-11-21 00:00:00',
    updatedAt: '2002-11-21 00:00:00',
  },
  {
    id: '2004emerald',
    task: 'emerald',
    user: 'hoenn',
    memo: 'Rayquaza',
    deadline: '2004-9-16 00:00:00',
    isDone: true,
    createdAt: '2004-09-16 00:00:00',
    updatedAt: '2004-09-16 00:00:00',
  },
  {
    id: '2006diamond',
    task: 'diamond',
    user: 'sinnoh',
    memo: 'Dialga',
    deadline: '2006-09-28 00:00:00',
    isDone: false,
    createdAt: '2006-09-28 00:00:00',
    updatedAt: '2006-09-28 00:00:00',
  },
  {
    id: '2006pearl',
    task: 'pearl',
    user: 'sinnoh',
    memo: 'Palkia',
    deadline: '2006-09-28 00:00:00',
    isDone: false,
    createdAt: '2006-09-28 00:00:00',
    updatedAt: '2006-09-28 00:00:00',
  },
  {
    id: '2008platinum',
    task: 'platinum',
    user: 'sinnoh',
    memo: 'Giratina',
    deadline: '2008-09-13 00:00:00',
    isDone: false,
    createdAt: '2008-09-13 00:00:00',
    updatedAt: '2008-09-13 00:00:00',
  },
  {
    id: '2010black',
    task: 'black',
    user: 'Unova',
    memo: 'Reshiram',
    deadline: '2010-09-18 00:00:00',
    isDone: false,
    createdAt: '2010-09-18 00:00:00',
    updatedAt: '2010-09-18 00:00:00',
  },
  {
    id: '2010white',
    task: 'white',
    user: 'Unova',
    memo: 'Zekrom',
    deadline: '2010-09-18 00:00:00',
    isDone: false,
    createdAt: '2010-09-18 00:00:00',
    updatedAt: '2010-09-18 00:00:00',
  },
  {
    id: '2012black2',
    task: 'black2',
    user: 'Unova',
    memo: 'Kyurem',
    deadline: '2012-06-23 00:00:00',
    isDone: false,
    createdAt: '2012-06-23 00:00:00',
    updatedAt: '2012-06-23 00:00:00',
  },
  {
    id: '2012white2',
    task: 'white2',
    user: 'Unova',
    memo: 'Kyurem',
    deadline: '2012-06-23 00:00:00',
    isDone: false,
    createdAt: '2012-06-23 00:00:00',
    updatedAt: '2012-06-23 00:00:00',
  },
  {
    id: '2013x',
    task: 'x',
    user: 'Kalos',
    memo: 'Xerneas',
    deadline: '2013-10-12 00:00:00',
    isDone: false,
    createdAt: '2013-10-12 00:00:00',
    updatedAt: '2013-10-12 00:00:00',
  },
  {
    id: '2013y',
    task: 'y',
    user: 'Kalos',
    memo: 'Yveltal',
    deadline: '2013-10-12 00:00:00',
    isDone: false,
    createdAt: '2013-10-12 00:00:00',
    updatedAt: '2013-10-12 00:00:00',
  },
  {
    id: '2016sun',
    task: 'sun',
    user: 'alola',
    memo: 'Solgaleo',
    deadline: '2016-11-18 00:00:00',
    isDone: false,
    createdAt: '2016-11-18 00:00:00',
    updatedAt: '2016-11-18 00:00:00',
  },
  {
    id: '2016moon',
    task: 'moon',
    user: 'alola',
    memo: 'Lunala',
    deadline: '2016-11-18 00:00:00',
    isDone: false,
    createdAt: '2016-11-18 00:00:00',
    updatedAt: '2016-11-18 00:00:00',
  },
  {
    id: '2017ultrasun',
    task: 'ultrasun',
    user: 'alola',
    memo: 'Necrozma',
    deadline: '2017-11-17 00:00:00',
    isDone: false,
    createdAt: '2017-11-17 00:00:00',
    updatedAt: '2017-11-17 00:00:00',
  },
  {
    id: '2017ultramoon',
    task: 'ultramoon',
    user: 'alola',
    memo: 'Necrozma',
    deadline: '2017-11-17 00:00:00',
    isDone: false,
    createdAt: '2017-11-17 00:00:00',
    updatedAt: '2017-11-17 00:00:00',
  },
  {
    id: '2019sword',
    task: 'sword',
    user: 'Galar',
    memo: 'Zacian',
    deadline: '2019-11-15 00:00:00',
    isDone: false,
    createdAt: '2019-11-15 00:00:00',
    updatedAt: '2019-11-15 00:00:00',
  },
  {
    id: '2019shield',
    task: 'shield',
    user: 'Galar',
    memo: 'Zamazenta',
    deadline: '2019-11-15 00:00:00',
    isDone: false,
    createdAt: '2019-11-15 00:00:00',
    updatedAt: '2019-11-15 00:00:00',
  },
];

export class DummyDataService {
  async findAll(): Promise<Todo[]> {
    return dummy;
  }

  async findByUser(user: string): Promise<Todo[]> {
    return dummy.filter(d => d.user === user);
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
