const {
    getUserByEmailDB,
    createUserDB,
    checkUserByPwdDB
} = require('../repository/auth.repository');

async function createUser(name, surname, email, pwd) {
    const foundUser = await getUserByEmailDB(email);
    if (foundUser.length) throw new Error('Есть такой');

    await createUserDB(name, surname, email, pwd);
}

async function doAuthorization(email, pwd) {
    const foundUser = await getUserByEmailDB(email);
    if (!foundUser.length) throw new Error('Нет такого email');

    const user = await checkUserByPwdDB(pwd);
    if(!user.length) throw new Error('Пароль не совпадает');
}

module.exports = {
    createUser,
    doAuthorization
};