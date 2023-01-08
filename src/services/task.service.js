const {
    ExceptionType
} = require('../helper/exceptions.type');
const {
    getTasksDB,
    getTaskByIdDB,
    createTaskDB,
    updateTaskDB,
    deleteTaskDB,
    patchTaskDB
} = require('../repository/task.repository');

const getTasks = async () => {
    const dataTask = await getTasksDB();
    if (!dataTask.length) throw new Error(ExceptionType.GET_TASKS_NOT_FOUND.message);
    return dataTask;
};

const getTaskById = async (id) => {
    const dataTask = await getTaskByIdDB(id);
    if (!dataTask.length) throw new Error(ExceptionType.GET_TASK_NOT_FOUND.message);
    return dataTask;
};

const createTask = async (task, user_id) => {
    const dataTask = await createTaskDB(task, user_id);
    if (!dataTask.length) throw new Error(ExceptionType.POST_TASK_NOT_FOUND.message);
    return dataTask;
};

const updateTask = async (id, task, user_id) => {
    const dataTask = await updateTaskDB(id, task, user_id);
    if (!dataTask.length) throw new Error(ExceptionType.PUT_TASK_NOT_FOUND.message);
    return dataTask;
};

const deleteTask = async (id) => {
    const dataTask = await deleteTaskDB(id);
    if (!dataTask.length) throw new Error(ExceptionType.DELETE_TASK_NOT_FOUND.message);
    return dataTask;
};

const patchTask = async (id, dataClient) => {
    const dataTask = await patchTaskDB(id, dataClient);
    if (!dataTask.length) throw new Error(ExceptionType.PATCH_TASK_NOT_FOUND.message);
    return dataTask;
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    patchTask
};