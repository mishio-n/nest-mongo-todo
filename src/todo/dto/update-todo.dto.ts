import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdateTodoDTO {
  @IsString()
  @ApiPropertyOptional({
    description: 'タスク名',
  })
  readonly task: string;

  @IsString()
  @ApiPropertyOptional({
    description: 'タスクの説明',
  })
  readonly memo: string;

  @IsDate()
  @ApiPropertyOptional({
    description: '期限日',
  })
  readonly deadline: Date;

  @IsBoolean()
  @ApiPropertyOptional({
    description: 'タスクの状態（完了・未完了）',
  })
  readonly isDone: boolean;

  // 更新時間を設定
  readonly updatedAt = new Date();
}
