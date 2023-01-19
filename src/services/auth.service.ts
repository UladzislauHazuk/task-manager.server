import bcrypt from 'bcrypt';
import { getUserByEmailDB, createUserDB } from '../repository/auth.repository';
import { ExceptionType } from '../helper/exceptions.type';

const saltround = 10;

const createUser = async (name: string, surname: string, email: string, pwd: string): Promise<void> => {
  const foundUser = await getUserByEmailDB(email);
  if (foundUser.length) throw new Error(ExceptionType.REG_USER_SAME_LOGIN.message);

  const hashPwd = await bcrypt.hash(pwd, saltround);
  await createUserDB(name, surname, email, hashPwd);
};

const doAuthorization = async (email: string, pwd: string): Promise<void> => {
  const foundUser = await getUserByEmailDB(email);
  if (!foundUser.length) throw new Error(ExceptionType.AUTH_USER_WITH_EMAIL.message);

  const pwdDB = await getUserByEmailDB(email);

  if (!(await bcrypt.compare(pwd, pwdDB[0].pwd))) throw new Error(ExceptionType.AUTH_USER_WITH_PWD.message);
};

export { createUser, doAuthorization };
