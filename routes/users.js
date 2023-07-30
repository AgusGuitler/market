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
  res.status(201).json({
    message: 'created',
    data: body
  });
})

usersRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.status(202).json({
    message: 'update',
    data: body,
    id,
  });
})

usersRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: 'deleted',
    id,
  });
})

module.exports = usersRouter;
