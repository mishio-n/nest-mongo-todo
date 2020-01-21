import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

// Swagger用にclassにする
export class Todo {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly user: string;
  @ApiProperty()
  readonly task: string;
  @ApiProperty()
  readonly memo: string;
  @ApiProperty()
  readonly deadline: Date;
  @ApiProperty()
  readonly createdAt: Date;
  @ApiProperty()
  readonly updatedAt: Date;
  @ApiProperty()
  readonly isDone: boolean;
}

// DB操作用
export type TodoDoc = Todo & Document;
