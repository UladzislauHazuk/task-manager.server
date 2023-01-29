import { getUsersDB, getUsersByIdDB, updateUsersDB, deleteUserDB, patchUsersDB } from '../../repository/user.repository';

const mClient = {
  query: jest.fn(),
};

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(() => mClient),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('getUsersDB', () => {
  test('should return succes', async () => {
    const mockUsers = [{ id: 1, name: 'Uladzislau', surname: 'Hazuk', pwd: 'pwd12345', email: 'vladislav.gazuk@gmail.com', status: 1 }];

    mClient.query.mockResolvedValue({ rows: mockUsers });
    const expected = await getUsersDB();

    expect(expected).toEqual(mockUsers);
  });
});

describe('getUserByIdDB', () => {
  test('should return succes', async () => {
    const mockUsers = [{ id: 1, name: 'Uladzislau', surname: 'Hazuk', pwd: 'pwd12345', email: 'vladislav.gazuk@gmail.com', status: 1 }];

    mClient.query.mockResolvedValue({ rows: mockUsers });
    const expected = await getUsersByIdDB(1);

    expect(expected).toEqual(mockUsers);
  });
});

describe('updateUserDB', () => {
  test('should return succes', async () => {
    const mockUsers = [{ id: 1, name: 'Uladzislau', surname: 'Hazuk', pwd: 'pwd12345', email: 'vladislav.gazuk@gmail.com', status: 1 }];

    mClient.query.mockResolvedValue({ rows: mockUsers });
    const expected = await updateUsersDB(1, 'Uladzislau', 'Hazuk', 'pwd12345', 'vladislav.gazuk@gmail.com', 1);

    expect(mClient.query).toBeCalledWith('COMMIT');
    expect(expected).toEqual(mockUsers);
  });
});

describe('deleteUserDB', () => {
  test('should return succes', async () => {
    const mockUsers = [{ id: 1, name: 'Uladzislau', surname: 'Hazuk', pwd: 'pwd12345', email: 'vladislav.gazuk@gmail.com', status: 1 }];

    mClient.query.mockResolvedValue({ rows: mockUsers });
    const expected = await deleteUserDB(1);

    expect(mClient.query).toBeCalledWith('COMMIT');
    expect(expected).toEqual(mockUsers);
  });
});

describe('patchUserDB', () => {
  test('should return succes', async () => {
    const mockUsers = [{ id: 1, name: 'Uladzislau', surname: 'Hazuk', pwd: 'pwd12345', email: 'vladislav.gazuk@gmail.com', status: 1 }];

    mClient.query.mockResolvedValue({ rows: mockUsers });
    const expected = await patchUsersDB(1, { name: 'Uladzislau' });

    expect(mClient.query).toBeCalledWith('COMMIT');
    expect(expected).toEqual(mockUsers);
  });
});
