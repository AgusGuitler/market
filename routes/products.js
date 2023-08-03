const express = require('express');

const ProductsService = require('../services/products')

const productsRouter = express.Router();
const service = new ProductsService();

productsRouter.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
})

productsRouter.get('/:id', async (req, res) =>  {
  try {
    const { id } = req.params;
    const respuesta = await service.findOne(id);
    res.status(200).json(respuesta);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

productsRouter.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
})

productsRouter.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(202).json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
})

productsRouter.delete('/:id', async (req, res) => {
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

module.exports = productsRouter;
