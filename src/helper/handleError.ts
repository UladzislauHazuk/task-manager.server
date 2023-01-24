import { Response } from 'express';

const handleError = (res: Response, status: number, message) => {
  res.status(status);
  res.send(message);
};

export { handleError };
