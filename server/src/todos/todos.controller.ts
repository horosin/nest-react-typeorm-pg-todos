import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { AuthRequest } from '../auth/interfaces';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(@Req() request: AuthRequest) {
    const userId = request.user.sub;
    return this.todosService.findByUserId(userId);
  }

  @Post()
  async create(@Req() request: AuthRequest, @Body('title') title: string) {
    const userId = request.user.sub;
    return await this.todosService.createForUser(title, userId);
  }

  @Delete(':id')
  async remove(@Req() request: AuthRequest, @Param('id') id: string) {
    const userId = request.user.sub;
    const todo = await this.todosService.findOne(+id);
    if (todo.user.id !== userId) {
      throw new Error('Unauthorized');
    }
    return await this.todosService.remove(+id);
  }
}
