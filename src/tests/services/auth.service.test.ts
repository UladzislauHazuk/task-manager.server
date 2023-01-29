import bcrypt from 'bcrypt';
import { createUser, doAuthorization } from '../../services/auth.service';
import * as repository from '../../repository/auth.repository';
import { ExceptionType } from '../../helper/exceptions.type';

describe('createUser function', () => {
  test('should return succes', async () => {
    const mockGet = jest.spyOn(repository, 'getUserByEmailDB');
    const mockHash = jest.spyOn(bcrypt, 'hash');
    const mockCreate = jest.spyOn(repository, 'createUserDB');

    mockGet.mockResolvedValue([]);
    mockHash.mockResolvedValue('$2b$10$i2xYLZ6qfjy90VgJ09/5DeAAH9QtRDPvX7I/nYtFR0omynCHy2DOy');
    mockCreate.mockResolvedValue();

    await createUser('Uladzislau', 'Hazuk', 'hashpwd', 'vladislav.gazuk@gmail.com');

    expect(mockCreate).toHaveBeenCalled();
  });

  test('should return exception', async () => {
    const mockGet = jest.spyOn(repository, 'getUserByEmailDB');
    const mockHash = jest.spyOn(bcrypt, 'hash');
    const mockCreate = jest.spyOn(repository, 'createUserDB');

    mockGet.mockResolvedValue([{ name: 'Uladzislau', surname: 'Hazuk', pwd: 'hashpwd', email: 'vladislav.gazuk@gmail.com' }]);
    try {
      await createUser('Uladzislau', 'Hazuk', 'hashpwd', 'vladislav.gazuk@gmail.com');
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.REG_USER_SAME_LOGIN.message);
    }
  });
});

describe('doAuthorisation function', () => {
  test('should return succes', async () => {
    const mockGet = jest.spyOn(repository, 'getUserByEmailDB');
    const mockCompare = jest.spyOn(bcrypt, 'compare');

    mockGet.mockResolvedValue([{ name: 'Uladzislau', surname: 'Hazuk', pwd: 'pwd12345', email: 'vladislav.gazuk@gmail.com' }]);
    mockCompare.mockResolvedValue(true);

    await doAuthorization('hashpwd', 'vladislav.gazuk@gmail.com');

    expect(mockGet).toBeCalled();
  });

  test('should return exception', async () => {
    const mockGet = jest.spyOn(repository, 'getUserByEmailDB');
    const mockCompare = jest.spyOn(bcrypt, 'compare');

    mockGet.mockResolvedValue([]);
    mockCompare.mockResolvedValue(true);

    try {
      await doAuthorization('hashpwd', 'vladislav.gazuk@gmail.com');
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.AUTH_USER_WITH_EMAIL.message);
    }
  });

  test('should return exception', async () => {
    const mockGet = jest.spyOn(repository, 'getUserByEmailDB');
    const mockCompare = jest.spyOn(bcrypt, 'compare');

    mockGet.mockResolvedValue([{ name: 'Uladzislau', surname: 'Hazuk', pwd: 'pwd12345', email: 'vladislav.gazuk@gmail.com' }]);
    mockCompare.mockResolvedValue(false);

    try {
      await doAuthorization('hashpwd', 'vladislav.gazuk@gmail.com');
    } catch (error: any) {
      expect(error.message).toBe(ExceptionType.AUTH_USER_WITH_PWD.message);
    }
  });
});
