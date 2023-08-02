const express = require('express');
const CategoriesService = require('../services/categories');

const categoriesRouter = express.Router();
const service = new CategoriesService();

categoriesRouter.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
})

categoriesRouter.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  })
})

categoriesRouter.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const categorie = service.findOne(categoryId);
  res.json(categorie);
})

categoriesRouter.post('/', (req, res) => {
  const body = req.body;
  const newCategory = service.create(body);
  res.status(201).json(newCategory);
})

categoriesRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const category = service.update(id, body)
  res.status(202).json(category);
})

categoriesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = service.delete(id);
  res.status(200).json(respuesta);
})

module.exports = categoriesRouter;
