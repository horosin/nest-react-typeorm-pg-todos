import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  findByUserId(userId: number): Promise<Todo[]> {
    return this.todosRepository.find({
      where: { user: { id: userId } },
    });
  }

  async createForUser(title: string, userId: number): Promise<Todo> {
    const todo = new Todo();
    todo.title = title;
    todo.user = { id: userId } as any;
    return this.todosRepository.save(todo);
  }

  async remove(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }

  async findOne(id: number): Promise<Todo> {
    return this.todosRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }
}
