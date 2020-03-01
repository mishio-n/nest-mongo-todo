import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString, IsOptional } from 'class-validator';

export class UpdateTodoDTO {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'タスク名',
  })
  readonly task?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'タスクの説明',
  })
  readonly memo?: string;

  @IsDate()
  @IsOptional()
  @ApiPropertyOptional({
    description: '期限日',
  })
  readonly deadline?: Date;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'タスクの状態（完了・未完了）',
  })
  readonly isDone?: boolean;

  // 更新時間を設定
  readonly updatedAt = new Date();
}
