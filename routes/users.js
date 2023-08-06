const express = require('express');

const UsersService = require('../services/users');
const validatorHandler = require('../middlewares/validatorhandler');
const { createSchema, updateSchema, getSchema } = require('../schemas/users');

const usersRouter = express.Router();
const service = new UsersService();


usersRouter.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
})

usersRouter.get('/:id',
  validatorHandler(getSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error)
    }
})

usersRouter.post('/',
  validatorHandler(createSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
})

usersRouter.patch('/:id',
  validatorHandler(getSchema, 'params'),
  validatorHandler(updateSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.status(202).json(user);
    } catch (error) {
      next(error)
    }
})

usersRouter.delete('/:id',
  validatorHandler(getSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const respuesta = await service.delete(id);
      res.status(200).json(respuesta);
    } catch (error) {
      next(error)
    }
})

module.exports = usersRouter;
