import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// Swagger用にclassにする
export class Todo {
  @ApiProperty({
    description: 'id',
  })
  readonly id: string;

  @ApiProperty({
    description: '作成者',
  })
  readonly user: string;

  @ApiProperty({
    description: 'タスク名',
  })
  readonly task: string;

  @ApiProperty({
    description: 'タスクの説明',
  })
  readonly memo: string;

  @ApiProperty({
    description: '期限（YYYY-MM-DD HH:mm:ss）',
  })
  readonly deadline: string;

  @ApiProperty({
    description: '作成日時（YYYY-MM-DD HH:mm:ss）',
  })
  readonly createdAt: string;

  @ApiProperty({
    description: '更新日時（YYYY-MM-DD HH:mm:ss）',
  })
  readonly updatedAt: string;

  @ApiProperty({
    description: 'タスクの状態（完了・未完了）',
  })
  readonly isDone: boolean;
}

// DB操作用
export type TodoDoc = Todo & Document;
