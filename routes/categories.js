const express = require('express');
const CategoriesService = require('../services/categories');

const categoriesRouter = express.Router();
const service = new CategoriesService();

categoriesRouter.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
})

categoriesRouter.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  })
})

categoriesRouter.get('/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await service.findOne(categoryId);
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

categoriesRouter.post('/', async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json(newCategory);
})

categoriesRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await service.update(id, body)
    res.status(202).json(category);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

categoriesRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

module.exports = categoriesRouter;
