import { buildResponse } from '../../helper/buildResponse';
import { Response } from 'express';

describe('buildResponse function', () => {
  test('Success', () => {
    const Response: Response = {
      status: jest.fn(),
      send: jest.fn(),
    };

    const message = 'Success';

    buildResponse(Response, 200, message);

    expect(Response.status).toHaveBeenCalled();
    expect(Response.send).toHaveBeenCalled();
    expect(Response.status).toHaveBeenCalledWith(200);
    expect(Response.send).toHaveBeenCalledWith('Success');
  });
});
