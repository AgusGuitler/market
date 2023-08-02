const express = require('express');

const ProductsService = require('../services/products')

const productsRouter = express.Router();
const service = new ProductsService();

productsRouter.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
})

productsRouter.get('/:id', (req, res) =>  {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
})

productsRouter.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
})

productsRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.status(202).json(product);
})

productsRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const respuesta = service.delete(id);
  res.status(200).json(respuesta);
})

module.exports = productsRouter;
