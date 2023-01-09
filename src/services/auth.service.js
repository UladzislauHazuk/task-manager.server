const bcrypt = require('bcrypt');

const { getUserByEmailDB, createUserDB, checkUserByPwdDB } = require('../repository/auth.repository');

const { ExceptionType } = require('../helper/exceptions.type');

const saltround = 10;

const createUser = async (name, surname, email, pwd) => {
  const foundUser = await getUserByEmailDB(email);
  if (foundUser.length) throw new Error(ExceptionType.REG_USER_SAME_LOGIN.message);

  const hashPwd = await bcrypt.hash(pwd, saltround);
  await createUserDB(name, surname, email, hashPwd);
};

const doAuthorization = async (email, pwd) => {
  const foundUser = await getUserByEmailDB(email);
  if (!foundUser.length) throw new Error(ExceptionType.AUTH_USER_WITH_EMAIL.message);

  const pwdDB = await checkUserByPwdDB(pwd, email);

  if (!(await bcrypt.compare(pwd, pwdDB))) throw new Error(ExceptionType.AUTH_USER_WITH_PWD.message);
};

module.exports = {
  createUser,
  doAuthorization,
};
