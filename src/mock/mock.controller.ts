import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTodoDTO } from '../todo/dto/create-todo.dto';
import { UpdateTodoDTO } from '../todo/dto/update-todo.dto';
import { UpdateDoneTodoGuard } from '../todo/guard/update-done-todo.guard';
import { TransformInterceptor } from '../todo/interceptor/transform.interceptor';
import { SortKey } from '../todo/shared/sort-key';
import { Todo } from '../todo/shared/todo.model';
import { MockService } from './mock.service';

@Controller('mock')
@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('mock')
export class MockController {
  constructor(private readonly mockService: MockService) {}

  @Get()
  @ApiQuery({
    name: 'sortKey',
    enum: SortKey,
    required: false,
    description: `
      デフォルトは createdAt（作成日順）
    `,
  })
  @ApiQuery({
    name: 'ascending',
    type: Boolean,
    required: false,
    description: `
      デフォルトは false（降順）
    `,
  })
  @ApiOkResponse({
    type: [Todo],
    description: `
      DBに保存されている全てのTodoをリストで返します
    `,
  })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @UseInterceptors(TransformInterceptor)
  async findAll(
    @Query('ascending') ascending: string,
    @Query('ascending') sortKey: SortKey,
  ): Promise<Todo[]> {
    const list = await this.mockService.findAll(
      SortKey[sortKey],
      // boolean でないので string として扱う
      ascending === 'true' ? 1 : -1,
    );

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
  @ApiQuery({
    name: 'sortKey',
    enum: SortKey,
    required: false,
    description: `
      デフォルトは createdAt（作成日順）
    `,
  })
  @ApiQuery({
    name: 'ascending',
    type: Boolean,
    required: false,
    description: `
      デフォルトは false（降順）
    `,
  })
  @ApiOkResponse({
    type: [Todo],
    description: `
      ユーザーごとのTodoリストを返します
    `,
  })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @UseInterceptors(TransformInterceptor)
  async findByUser(
    @Param('user') user: string,
    @Query('ascending') ascending: string,
    @Query('ascending') sortKey: SortKey,
  ): Promise<Todo[]> {
    const list = await this.mockService.findByUser(
      user,
      SortKey[sortKey], // boolean でないので string として扱う
      ascending === 'true' ? 1 : -1,
    );

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
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @UseInterceptors(TransformInterceptor)
  async create(@Body() createTodoDto: CreateTodoDTO): Promise<Todo> {
    return this.mockService.create(createTodoDto);
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
  @ApiForbiddenResponse({
    description: `
      完了しているTodoの編集はできません
    `,
  })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @UseInterceptors(TransformInterceptor)
  @UseGuards(UpdateDoneTodoGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDTO,
  ): Promise<Todo> {
    try {
      return this.mockService.update(id, updateTodoDto);
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
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  async delete(@Param('id') id: string): Promise<void> {
    const result = await this.mockService.delete(id);
    if (result.deletedCount === 0) {
      throw new HttpException(
        `Missing data has id:${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return;
  }

  // 完了 → 未完了への変更はこのエンドポイントでのみ可能とする
  @Put('/undone/:id')
  @ApiParam({
    name: 'id',
    type: 'string',
  })
  @ApiOkResponse({
    type: Todo,
    description: `
      更新したTODOデータを返します
    `,
  })
  @ApiForbiddenResponse({
    description: `
      未完了Todoは処理対象外です
    `,
  })
  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @UseInterceptors(TransformInterceptor)
  async undone(@Param('id') id: string): Promise<Todo> {
    try {
      return this.mockService.undone(id);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
