import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return await this.todosService.findAll();
  }

  @Post()
  async create(@Body('title') title: string) {
    return await this.todosService.create(title);
  }
}
