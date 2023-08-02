const express = require('express');
const UsersService = require('../services/users');

const usersRouter = express.Router();
const service = new UsersService();

usersRouter.get('/', (req, res) => {
  const users = service.find();
  res.json(users);
})

usersRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const user = service.findOne(userId);
  res.json(user);
})

usersRouter.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.status(201).json(newUser);
})

usersRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = service.update(id, body);
  res.status(202).json(user);
})

usersRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = service.delete(id);
  res.status(200).json(respuesta);
})

module.exports = usersRouter;
