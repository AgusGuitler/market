const express = require('express');

const ProductsService = require('../services/products');
const validatorHandler = require('../middlewares/validatorhandler');
const { createSchema, updateSchema, getSchema } = require('../schemas/products');

const productsRouter = express.Router();
const service = new ProductsService();

productsRouter.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
})

productsRouter.get('/:id',
  validatorHandler(getSchema, 'params'),
  async (req, res, next) =>  {
    try {
      const { id } = req.params;
      const respuesta = await service.findOne(id);
      res.status(200).json(respuesta);
    } catch (error) {
      next(error)
    }
})

productsRouter.post('/',
  validatorHandler(createSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
})

productsRouter.patch('/:id',
  validatorHandler(getSchema, 'params'),
  validatorHandler(updateSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.status(202).json(product);
    } catch (error) {
      next(error)
    }
})

productsRouter.delete('/:id',
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

module.exports = productsRouter;
