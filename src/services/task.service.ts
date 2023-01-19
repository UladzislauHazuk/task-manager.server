import { ExceptionType } from '../helper/exceptions.type';
import { getTasksDB, getTaskByIdDB, createTaskDB, updateTaskDB, deleteTaskDB, patchTaskDB } from '../repository/task.repository';
import { iTask } from '../interfaces/interfaces';

const getTasks = async (): Promise<iTask[]> => {
  const dataTask = await getTasksDB();
  if (!dataTask.length) throw new Error(ExceptionType.GET_TASKS_NOT_FOUND.message);
  return dataTask;
};

const getTaskById = async (id: number): Promise<iTask[]> => {
  const dataTask = await getTaskByIdDB(id);
  if (!dataTask.length) throw new Error(ExceptionType.GET_TASK_NOT_FOUND.message);
  return dataTask;
};

const createTask = async (task: string, user_id: number): Promise<iTask[]> => {
  const dataTask = await createTaskDB(task, user_id);
  if (!dataTask.length) throw new Error(ExceptionType.POST_TASK_NOT_FOUND.message);
  return dataTask;
};

const updateTask = async (id: number, task: string, user_id: number): Promise<iTask[]> => {
  const dataTask = await updateTaskDB(id, task, user_id);
  if (!dataTask.length) throw new Error(ExceptionType.PUT_TASK_NOT_FOUND.message);
  return dataTask;
};

const deleteTask = async (id: number): Promise<iTask[]> => {
  const dataTask = await deleteTaskDB(id);
  if (!dataTask.length) throw new Error(ExceptionType.DELETE_TASK_NOT_FOUND.message);
  return dataTask;
};

const patchTask = async (id: number, dataClient: iTask): Promise<iTask[]> => {
  const dataTask = await patchTaskDB(id, dataClient);
  if (!dataTask.length) throw new Error(ExceptionType.PATCH_TASK_NOT_FOUND.message);
  return dataTask;
};

export { getTasks, getTaskById, createTask, updateTask, deleteTask, patchTask };
