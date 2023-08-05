const express = require('express');
const UsersService = require('../services/users');

const usersRouter = express.Router();
const service = new UsersService();

usersRouter.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
})

usersRouter.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await service.findOne(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (req, res) => {
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json(newUser);
})

usersRouter.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await service.update(id, body);
    res.status(202).json(user);
  } catch (error) {
    next(error)
  }
})

usersRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.status(200).json(respuesta);
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter;
