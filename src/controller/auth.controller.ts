import express, { Request, Response } from 'express';
import { createUser, doAuthorization } from '../services/auth.service';
import { buildResponse } from '../helper/buildResponse';
import { handleError } from '../helper/handleError';
import { isValidUser, isValidEmail } from '../helper/validation';

const route = express.Router();

route.post('/reg', isValidUser, isValidEmail, async (req: Request, res: Response) => {
  try {
    const { name, surname, email, pwd } = req.body;
    await createUser(name, surname, email, pwd);
    buildResponse(res, 200, 'Success');
  } catch (error) {
    handleError(res, 404, error);
  }
});

route.post('/auth', isValidEmail, async (req: Request, res: Response) => {
  try {
    const { email, pwd } = req.body;
    await doAuthorization(email, pwd);
    buildResponse(res, 200, 'Success');
  } catch (error) {
    handleError(res, 404, error);
  }
});

export default route;
