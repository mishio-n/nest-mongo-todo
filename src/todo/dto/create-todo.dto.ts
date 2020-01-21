import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '作成者',
  })
  readonly user: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'タスク名',
  })
  readonly task: string;

  @IsString()
  @ApiProperty({
    description: 'タスクの説明',
  })
  readonly memo: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '期限日',
  })
  readonly deadline: Date;

  // 以下のプロパティについては初期値を設定
  readonly createdAt = new Date();
  readonly updatedAt = new Date();
  readonly isDone = false;
}
