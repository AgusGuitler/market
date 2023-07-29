const express = require('express');
const { faker } = require('@faker-js/faker');

const categoriesRouter = express.Router();

categoriesRouter.get('/', (req, res) => {
  const categories = [];

  for ( let index = 0; index < 10; index++ ) {
    categories.push({
      genre: faker.music.genre(),
    })
  }
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
  res.json({
    categorieId,
  })
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
