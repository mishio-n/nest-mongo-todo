import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { TodoModule } from './todo/todo.module';
import { MockModule } from './mock/mock.module';

@Module({
  imports: [
    TodoModule,
    MockModule,
    // database `todo` へのコネクションを生成
    MongooseModule.forRoot('mongodb://localhost:27017/todo', {
      // 以下、エラー抑制のため設定
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    // ルートへのアクセスで、client ディレクトリの index.html をサーブする
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client', 'angular'),
      renderPath: '/angular',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client', 'react'),
      renderPath: '/react',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'client', 'vue'),
      renderPath: '/vue',
    }),
  ],
})
export class AppModule {}
