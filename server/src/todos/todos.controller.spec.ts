import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
  let controller: TodosController;
  let todosService: TodosService;

  const mockRequest = {
    user: { sub: '123' },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            findByUserId: jest.fn().mockResolvedValue(['todo1', 'todo2']),
            createForUser: jest
              .fn()
              .mockResolvedValue({ id: '1', title: 'New Todo', userId: '123' }),
            findOne: jest
              .fn()
              .mockImplementation((id) => ({
                id,
                title: 'Test Todo',
                user: { id: '123' },
              })),
            remove: jest
              .fn()
              .mockResolvedValue({
                id: '1',
                title: 'Deleted Todo',
                userId: '123',
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    todosService = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const result = ['todo1', 'todo2'];
      expect(await controller.findAll(mockRequest as any)).toStrictEqual(
        result,
      );
      expect(todosService.findByUserId).toHaveBeenCalledWith('123');
    });
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const title = 'New Todo';
      const result = { id: '1', title: 'New Todo', userId: '123' };
      expect(await controller.create(mockRequest as any, title)).toEqual(
        result,
      );
      expect(todosService.createForUser).toHaveBeenCalledWith(title, '123');
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      const id = '1';
      expect(await controller.remove(mockRequest as any, id)).toEqual({
        id: '1',
        title: 'Deleted Todo',
        userId: '123',
      });
      expect(todosService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw an error if user tries to delete a todo not belonging to them', async () => {
      todosService.findOne = jest
        .fn()
        .mockResolvedValue({
          id: '1',
          title: 'Test Todo',
          user: { id: '999' },
        }); // Simulate wrong user
      await expect(controller.remove(mockRequest as any, '1')).rejects.toThrow(
        'Unauthorized',
      );
    });
  });
});
