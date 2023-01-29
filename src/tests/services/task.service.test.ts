import { getTasks, createTask, getTaskById, updateTask, deleteTask, patchTask } from '../../services/task.service';
import * as repository from '../../repository/task.repository';
import { ExceptionType } from '../../helper/exceptions.type';

describe('getTasks function', () => {
  test('should return succes', async () => {
    const mock = jest.spyOn(repository, 'getTasksDB');

    mock.mockResolvedValue([{ id: 1, task: 'task', user_id: 1 }]);

    const result = await getTasks();

    expect(mock).toHaveBeenCalled();
    expect(result[0].task).toBe('task');
    expect(result[0].user_id).toBe(1);
  });

  test('should return exception', async () => {
    const mock = jest.spyOn(repository, 'getTasksDB');

    mock.mockResolvedValue([]);

    try {
      await getTasks();
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.GET_TASKS_NOT_FOUND.message);
    }
  });
});

describe('getTaskById function', () => {
  test('should return succes', async () => {
    const mock = jest.spyOn(repository, 'getTaskByIdDB');

    mock.mockResolvedValue([{ id: 1, task: 'task', user_id: 1 }]);

    const result = await getTaskById(1);

    expect(mock).toHaveBeenCalled();
    expect(result[0].id).toBe(1);
  });

  test('should return exception', async () => {
    const mock = jest.spyOn(repository, 'getTaskByIdDB');

    mock.mockResolvedValue([]);

    try {
      await getTaskById(1);
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.GET_TASK_NOT_FOUND.message);
    }
  });
});

describe('createTask function', () => {
  test('should return succes', async () => {
    const mock = jest.spyOn(repository, 'createTaskDB');

    mock.mockResolvedValue([{ id: 1, task: 'task', user_id: 1 }]);

    const result = await createTask('task', 1);

    expect(mock).toHaveBeenCalled();
    expect(result[0].task).toBe('task');
    expect(result[0].user_id).toBe(1);
  });

  test('should return exception', async () => {
    const mock = jest.spyOn(repository, 'createTaskDB');

    mock.mockResolvedValue([]);

    try {
      await createTask('task', 1);
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.POST_TASK_NOT_FOUND.message);
    }
  });
});

describe('updateTask function', () => {
  test('should return succes', async () => {
    const mock = jest.spyOn(repository, 'updateTaskDB');

    mock.mockResolvedValue([{ id: 1, task: 'task', user_id: 1 }]);

    const result = await updateTask(1, 'task', 1);

    expect(mock).toHaveBeenCalled();
    expect(result[0].id).toBe(1);
    expect(result[0].task).toBe('task');
    expect(result[0].user_id).toBe(1);
  });

  test('should return exception', async () => {
    const mock = jest.spyOn(repository, 'updateTaskDB');

    mock.mockResolvedValue([]);

    try {
      await updateTask(1, 'task', 1);
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.PUT_TASK_NOT_FOUND.message);
    }
  });
});

describe('deleteTask function', () => {
  test('should return succes', async () => {
    const mock = jest.spyOn(repository, 'deleteTaskDB');

    mock.mockResolvedValue([{ task: 'task', user_id: 1 }]);

    const result = await deleteTask(1);

    expect(mock).toHaveBeenCalled();
    expect(result[0].task).toBe('task');
    expect(result[0].user_id).toBe(1);
  });

  test('should return exception', async () => {
    const mock = jest.spyOn(repository, 'deleteTaskDB');

    mock.mockResolvedValue([]);

    try {
      await deleteTask(1);
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.DELETE_TASK_NOT_FOUND.message);
    }
  });
});

describe('patchTask function', () => {
  test('should return succes (patch task)', async () => {
    const mock = jest.spyOn(repository, 'patchTaskDB');

    mock.mockResolvedValue([{ id: 1, task: 'task', user_id: 1 }]);

    const result = await patchTask(1, { task: 'task' });

    expect(mock).toHaveBeenCalled();
    expect(result[0].id).toBe(1);
    expect(result[0].task).toBe('task');
    expect(result[0].user_id).toBe(1);
  });

  test('should return succes (patch user_id)', async () => {
    const mock = jest.spyOn(repository, 'patchTaskDB');

    mock.mockResolvedValue([{ id: 1, task: 'task', user_id: 1 }]);

    const result = await patchTask(1, { user_id: 1 });

    expect(mock).toHaveBeenCalled();
    expect(result[0].id).toBe(1);
    expect(result[0].task).toBe('task');
    expect(result[0].user_id).toBe(1);
  });

  test('should return exception', async () => {
    const mock = jest.spyOn(repository, 'patchTaskDB');

    mock.mockResolvedValue([]);

    try {
      await patchTask(1, { task: 'task' });
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.PATCH_TASK_NOT_FOUND.message);
    }
  });
});
