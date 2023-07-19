const controller = {};
const path = require('path');
const usersFile = path.resolve(__dirname, '../../data/users.json');
const fs = require('fs/promises');
const { v4 } = require('uuid');

controller.getUsers = async (req, res) => {
  try {
    const data = await fs.readFile(usersFile);
    const jsonData = await JSON.parse(data);
    res.send(jsonData);
  } catch (err) {
    res.status(500).send({ error: 'Error al obtener los usuarios' });
  }
};

controller.createUser = async (req, res) => {
  try {
    const { name, age, email } = req.body;

    const newUser = {
      userId: v4(),
      name,
      age: parseInt(age),
      email,
    };

    const data = await fs.readFile(usersFile);
    const jsonData = await JSON.parse(data);

    jsonData.push(newUser);

    await fs.writeFile(usersFile, JSON.stringify(jsonData));

    res.send(jsonData);
  } catch (err) {
    res.status(500).send({ error: 'Error al guardar usuario' });
  }
};

controller.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, age, email } = req.body;

    const data = await fs.readFile(usersFile);
    const jsonData = await JSON.parse(data);

    const userIndex = jsonData.findIndex((user) => user.userId === userId);

    if (userIndex === -1) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    const updatedUser = {
      userId,
      name,
      age: parseInt(age),
      email,
    };

    jsonData[userIndex] = updatedUser;

    await fs.writeFile(usersFile, JSON.stringify(jsonData));

    res.send(updatedUser);
  } catch (err) {
    res.status(500).send({ error: 'Error al actualizar usuario' });
  }
};

controller.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const data = await fs.readFile(usersFile);
    const jsonData = await JSON.parse(data);

    const filteredUsers = jsonData.filter((user) => user.userId !== userId);

    if (jsonData.length === filteredUsers.length) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    await fs.writeFile(usersFile, JSON.stringify(filteredUsers));

    res.send({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    res.status(500).send({ error: 'Error al eliminar usuario' });
  }
};

module.exports = controller;