import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodosService],
})
export class TodosModule {}
