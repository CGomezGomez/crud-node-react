const express = require('express');
const userRoutes = express.Router();
const controller = require('../controllers/users.controller');


userRoutes.get('/', controller.getUsers);


userRoutes.post('/create', controller.createUser);


userRoutes.put('/:id', controller.updateUser);


userRoutes.delete('/:id', controller.deleteUser);

module.exports = userRoutes;