import { getUsers, getUsersById, updateUsers, deleteUser, patchUsers } from '../../../services/user.service';
import * as repository from '../../../repository/user.repository';
import { ExceptionType } from '../../../helper/exceptions.type';

describe('getUsers function', () => {
  test('should return succes', async () => {
    const mock = jest.spyOn(repository, 'getUsersDB');

    mock.mockResolvedValue([{ id: 1, name: 'Uladzislau', surname: 'Hazuk', pwd: 'pwd12345', email: 'vladislav.gazuk@gmail.com', status: 1 }]);

    const result = await getUsers();

    expect(mock).toHaveBeenCalled();
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('Uladzislau');
  });

  test('should return exception', async () => {
    const mock = jest.spyOn(repository, 'getUsersDB');

    mock.mockResolvedValue([]);

    try {
      await getUsers();
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.GET_USERS_NOT_FOUND.message);
    }
  });
});

describe('getUserById function', () => {
  test('should return succes', async () => {
    const mock = jest.spyOn(repository, 'getUsersByIdDB');

    mock.mockResolvedValue([{ id: 1, name: 'Uladzislau', surname: 'Hazuk', pwd: '99007996', email: 'vladislav.gazuk@gmail.com', status: 1 }]);

    const result = await getUsersById(1);

    expect(mock).toHaveBeenCalled();
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('Uladzislau');
    expect(result[0].surname).toBe('Hazuk');
  });

  test('should return exception', async () => {
    const mock = jest.spyOn(repository, 'getUsersByIdDB');

    mock.mockResolvedValue([]);

    try {
      await getUsersById(1);
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.GET_USER_NOT_FOUND.message);
    }
  });
});

describe('updateUser function', () => {
  test('should return succes', async () => {
    const mock = jest.spyOn(repository, 'updateUsersDB');

    mock.mockResolvedValue([{ id: 1, name: 'Uladzislau', surname: 'Hazuk', pwd: '99007996', email: 'vladislav.gazuk@gmail.com', status: 1 }]);

    const result = await updateUsers(1, 'Uladzislau', 'Hazuk', '99007996', 'vladislav.gazuk@gmail.com', 1);

    expect(mock).toHaveBeenCalled();
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('Uladzislau');
    expect(result[0].surname).toBe('Hazuk');
    expect(result[0].pwd).toBe('99007996');
    expect(result[0].email).toBe('vladislav.gazuk@gmail.com');
    expect(result[0].status).toBe(1);
  });

  test('should return exception', async () => {
    const mock = jest.spyOn(repository, 'updateUsersDB');

    mock.mockResolvedValue([]);

    try {
      await updateUsers(1, 'Uladzislau', 'Hazuk', '99007996', 'vladislav.gazuk@gmail.com', 1);
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.PUT_USER_NOT_FOUND.message);
    }
  });
});

describe('deleteUser function', () => {
  test('should return succes', async () => {
    const mock = jest.spyOn(repository, 'deleteUserDB');

    mock.mockResolvedValue([{ id: 1, name: 'Uladzislau', surname: 'Hazuk', pwd: '99007996', email: 'vladislav.gazuk@gmail.com', status: 0 }]);

    const result = await deleteUser(1);

    expect(mock).toHaveBeenCalled();
    expect(result[0].id).toBe(1);
    expect(result[0].status).toBe(0);
  });

  test('should return exception', async () => {
    const mock = jest.spyOn(repository, 'deleteUserDB');

    mock.mockResolvedValue([]);

    try {
      await deleteUser(1);
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.DELETE_USER_NOT_FOUND.message);
    }
  });
});

describe('patchUser function', () => {
  test('should return succes', async () => {
    const mock = jest.spyOn(repository, 'patchUsersDB');

    mock.mockResolvedValue([{ id: 1, name: 'Uladzislau', surname: 'Hazuk', pwd: '99007996', email: 'vladislav.gazuk@gmail.com', status: 0 }]);

    const result = await patchUsers(1, { name: 'Uladzislau' });

    expect(mock).toHaveBeenCalled();
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('Uladzislau');
  });

  test('should return exception', async () => {
    const mock = jest.spyOn(repository, 'patchUsersDB');

    mock.mockResolvedValue([]);

    try {
      await patchUsers(1, { name: 'Uladzislau' });
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.PATCH_USER_NOT_FOUND.message);
    }
  });
});
