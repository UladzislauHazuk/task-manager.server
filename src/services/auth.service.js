const bcrypt = require('bcrypt');

const {
    getUserByEmailDB,
    createUserDB,
    checkUserByPwdDB
} = require('../repository/auth.repository');

const createUser = async (name, surname, email, pwd) => {
    const foundUser = await getUserByEmailDB(email);
    if (foundUser.length) throw new Error('Есть такой');

    const salt = await bcrypt.genSaltSync(10);
    const hashPwd = await bcrypt.hashSync(pwd, salt);
    await createUserDB(name, surname, email, hashPwd);
};

const doAuthorization = async (email, pwd) => {
    const foundUser = await getUserByEmailDB(email);
    if (!foundUser.length) throw new Error('Нет такого email');

    const userPwd = await checkUserByPwdDB(pwd, email);
    if(!userPwd) throw new Error('Пароль не совпадает');
};

module.exports = {
    createUser,
    doAuthorization
};