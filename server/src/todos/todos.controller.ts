import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  @Get()
  findAll(): string {
    return 'This action returns all todos';
  }

  @Post()
  create(): string {
    return 'This action adds a new todo';
  }

  @Patch()
  update(): string {
    return 'This action updates todo';
  }
}
