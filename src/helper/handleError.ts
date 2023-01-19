import { Response } from 'express';

const handleError = (res: Response, status: number, message) => {
  res.status(status).send(message);
};

export { handleError };
