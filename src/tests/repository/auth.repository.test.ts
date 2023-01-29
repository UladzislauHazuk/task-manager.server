import { getUserByEmailDB, createUserDB } from '../../repository/auth.repository';

const mClient = {
  query: jest.fn(),
};

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(() => mClient),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('getUserByEmailDB function', () => {
  test('should return succes', async () => {
    const mockTask = [{ id: 1, name: 'Uladzislau', surname: 'Hazuk', pwd: 'pwd12345', email: 'vladislav.gazuk@gmail.com', status: 1 }];
    mClient.query.mockResolvedValue({ rows: mockTask });
    const expected = await getUserByEmailDB('vladislav.gazuk@gmail.com');

    expect(expected).toEqual(mockTask);
  });
});

describe('createUserDB', () => {
  test('should return succes', async () => {
    const mockUsers = [{ id: 1, name: 'Uladzislau', surname: 'Hazuk', pwd: 'pwd12345', email: 'vladislav.gazuk@gmail.com', status: 1 }];

    mClient.query.mockResolvedValue({ rows: mockUsers });
    await createUserDB('Uladzislau', 'Hazuk', 'pwd12345', 'vladislav.gazuk@gmail.com');

    expect(mClient.query).toBeCalledWith('COMMIT');
  });
});
