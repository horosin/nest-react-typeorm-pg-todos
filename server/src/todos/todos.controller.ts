import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Post()
  create(@Body('title') title: string) {
    return this.todosService.create(title);
  }
}
