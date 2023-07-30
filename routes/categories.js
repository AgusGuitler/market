const express = require('express');
const CategoriesService = require('../services/categories');

const categoriesRouter = express.Router();
const service = new CategoriesService();

categoriesRouter.get('/', (req, res) => {
  const categories = service.find();
  res.json(categories);
})

categoriesRouter.get('/:categoryId/products/:productId', (req, res) => {
  const { categorieId, productId } = req.params;
  res.json({
    categorieId,
    productId,
  })
})

categoriesRouter.get('/:categorieId', (req, res) => {
  const { categorieId } = req.params;
  const categorie = service.findOne(categorieId);
  res.json(categorie);
})

categoriesRouter.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
})

categoriesRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.status(202).json({
    message: 'update',
    data: body,
    id,
  });
})

categoriesRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: 'deleted',
    id,
  });
})

module.exports = categoriesRouter;
