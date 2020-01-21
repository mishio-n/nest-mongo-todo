import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  HttpException,
  HttpStatus,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { Todo } from './model/todo.model';
import { TodoService } from './todo.service';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { IdTransformInterceptor } from './interceptor/id-transform.interceptor';

@Controller('todo')
@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOkResponse({
    type: [Todo],
    description: `
      DBに保存されている全てのTodoをリストで返します
    `,
  })
  @ApiNotFoundResponse({
    description: `
      DBにデータが存在しないか、アクセスできない状態です
    `,
  })
  @UseInterceptors(IdTransformInterceptor)
  async findAll(): Promise<Todo[]> {
    const list = await this.todoService.findAll();

    if (list.length === 0) {
      throw new HttpException('Missing todos in DB', HttpStatus.NOT_FOUND);
    }
    return list;
  }

  @Get(':user')
  @ApiParam({
    name: 'user',
    type: 'string',
  })
  @ApiOkResponse({
    type: [Todo],
    description: `
      ユーザーごとのTodoリストを返します
    `,
  })
  @ApiNotFoundResponse({
    description: `
      DBにデータが存在しないか、アクセスできない状態です
    `,
  })
  async findByUser(@Param('user') user: string): Promise<Todo[]> {
    const list = await this.todoService.findByUser(user);

    if (list.length === 0) {
      throw new HttpException(`Missing user ${user}`, HttpStatus.NOT_FOUND);
    }

    return list;
  }

  @Post()
  @ApiBody({
    type: CreateTodoDTO,
  })
  @ApiOkResponse({
    type: Todo,
    description: `
      作成したTODOデータを返します
    `,
  })
  @ApiNotFoundResponse({
    description: `
      DBにデータが存在しないか、アクセスできない状態です
    `,
  })
  @UseInterceptors(IdTransformInterceptor)
  async create(@Body() createTodoDto: CreateTodoDTO): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @ApiBody({
    type: UpdateTodoDTO,
  })
  @ApiOkResponse({
    type: Todo,
    description: `
      更新したTODOデータを返します
    `,
  })
  @ApiNotFoundResponse({
    description: `
      削除しようとしたデータが存在しません
    `,
  })
  @UseInterceptors(IdTransformInterceptor)
  async update(
    @Param('id') id: string,
    @Body() updateTodoDTO: UpdateTodoDTO,
  ): Promise<Todo> {
    try {
      return this.todoService.update(id, updateTodoDTO);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @ApiOkResponse({
    description: `
      正常時は何も返しません
    `,
  })
  @ApiNotFoundResponse({
    description: `
      削除しようとしたデータが存在しません
    `,
  })
  async delete(@Param('id') id: string): Promise<void> {
    const result = await this.todoService.delete(id);
    if (result.deletedCount === 0) {
      throw new HttpException(
        `Missing data has id:${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return;
  }
}
