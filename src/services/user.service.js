const {
    getUsersDB,
    getUsersByIdDB,
    updateUsersDB, 
    deleteUserDB
} = require('../repository/user.repository');

async function getUsers() {
    const user = await getUsersDB();
    if (!user.length) throw new Error('not found');
    return user;
}

async function getUsersById(id) {
    const user = await getUsersByIdDB(id);
    if (!user.length) throw new Error('not found');
    return user;
}

async function updateUsers(id, name, surname, pwd, email, status) {
    const user = await updateUsersDB(id, name, surname, pwd, email, status);
    if(!user.length) throw new Error('not found');
    return user;
}

async function deleteUser(id) {
    const user = await deleteUserDB(id);
    if (!user.length) throw new Error('not found');
    return user;
}

module.exports = {
    getUsers,
    getUsersById,
    updateUsers, 
    deleteUser
};