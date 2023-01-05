const express = require('express');
const {
    getUsers,
    getUsersById,
    updateUsers,
    deleteUser,
    patchUsers
} = require('../services/user.service');
const {
    buildResponse
} = require('../helper/buildResponse');
const {
    handleError
} = require('../helper/handleError');

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const user = await getUsers();
        buildResponse(res, 200, user);
    } catch (error) {
        handleError(res, 404, error.message);
    }
});

route.get('/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const user = await getUsersById(id);
        buildResponse(res, 200, user);
    } catch (error) {
        handleError(res, 404, error.message);
    }
});

route.put('/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            name,
            surname,
            pwd,
            email,
            status
        } = req.body;
        const user = await updateUsers(id, name, surname, pwd, email, status);
        buildResponse(res, 200, user);
    } catch (error) {
        handleError(res, 404, error.message);
    }
});

route.delete('/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const user = await deleteUser(id);
        buildResponse(res, 200, user);
    } catch (error) {
        handleError(res, 404, error.message);
    }
});

route.patch('/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params
        const user = await patchUsers(id, req.body)
        buildResponse(res, 200, user);
    } catch (error) {
        handleError(res, 404, error.message)
    }
});

module.exports = route;