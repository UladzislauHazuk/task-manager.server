import { getUsersDB, getUsersByIdDB, updateUsersDB, deleteUserDB, patchUsersDB } from '../repository/user.repository';
import { ExceptionType } from '../helper/exceptions.type';
import { iUser } from '../interfaces/interfaces';

const getUsers = async (): Promise<iUser[]> => {
  const user = await getUsersDB();
  if (!user.length) throw new Error(ExceptionType.GET_USERS_NOT_FOUND.message);
  return user;
};

const getUsersById = async (id: number): Promise<iUser[]> => {
  const user = await getUsersByIdDB(id);
  if (!user.length) throw new Error(ExceptionType.GET_USER_NOT_FOUND.message);
  return user;
};

const updateUsers = async (id: number, name: string, surname: string, pwd: string, email: string, status: number): Promise<iUser[]> => {
  const user = await updateUsersDB(id, name, surname, pwd, email, status);
  if (!user.length) throw new Error(ExceptionType.PUT_USER_NOT_FOUND.message);
  return user;
};

const deleteUser = async (id: number): Promise<iUser[]> => {
  const user = await deleteUserDB(id);
  if (!user.length) throw new Error(ExceptionType.DELETE_USER_NOT_FOUND.message);
  return user;
};

const patchUsers = async (id: number, dataFromClient: iUser): Promise<iUser[]> => {
  const user = await patchUsersDB(id, dataFromClient);
  if (!user.length) throw new Error(ExceptionType.PATCH_USER_NOT_FOUND.message);
  return user;
};

export { getUsers, getUsersById, updateUsers, deleteUser, patchUsers };
