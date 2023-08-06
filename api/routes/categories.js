const express = require('express');
const CategoriesService = require('../services/categories');

const categoriesRouter = express.Router();
const service = new CategoriesService();
const validatorHandler = require('../middlewares/validatorhandler');
const { createSchema, updateSchema, getSchema } = require('../schemas/categories');

categoriesRouter.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
})

categoriesRouter.get('/:categoryId',
  validatorHandler(getSchema, 'params'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await service.findOne(categoryId);
      res.status(200).json(category);
    } catch (error) {
      next(error)
    }
})

categoriesRouter.post('/',
  validatorHandler(createSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
})

categoriesRouter.patch('/:id',
  validatorHandler(getSchema, 'params'),
  validatorHandler(updateSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body)
      res.status(202).json(category);
    } catch (error) {
      next(error)
    }
})

categoriesRouter.delete('/:id',
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

module.exports = categoriesRouter;
