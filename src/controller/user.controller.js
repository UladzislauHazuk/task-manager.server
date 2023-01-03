const express = require('express');
const {
    getUsers,
    getUsersById,
    updateUsers,
    deleteUser
} = require('../services/user.service');

const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const user = await getUsers();
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

route.get('/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const user = await getUsersById(id);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send(error.message);
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
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

route.delete('/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const user = await deleteUser(id);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

module.exports = route;