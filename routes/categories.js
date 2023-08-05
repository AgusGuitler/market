const express = require('express');
const CategoriesService = require('../services/categories');

const categoriesRouter = express.Router();
const service = new CategoriesService();

categoriesRouter.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
})

categoriesRouter.get('/:categoryId', async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await service.findOne(categoryId);
    res.status(200).json(category);
  } catch (error) {
    next(error)
  }
})

categoriesRouter.post('/', async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
})

categoriesRouter.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body)
    res.status(202).json(category);
  } catch (error) {
    next(error)
  }
})

categoriesRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.status(200).json(respuesta);
  } catch (error) {
      next(error)
  }
})

module.exports = categoriesRouter;
