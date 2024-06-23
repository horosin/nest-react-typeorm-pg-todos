import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.todosService.remove(+id);
  }
}
