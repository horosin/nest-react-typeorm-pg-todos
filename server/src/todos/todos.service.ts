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

    async findAll(): Promise<Todo[]> {
        return this.todosRepository.find();
    }

    async create(title: string): Promise<Todo> {
        const todo = new Todo();
        todo.title = title;
        return this.todosRepository.save(todo);
    }

    async remove(id: number): Promise<void> {
        await this.todosRepository.delete(id);
    }
}
