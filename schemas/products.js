const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(20);
const price = joi.number().positive();
const image = joi.string().uri();

const createSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateSchema = joi.object({
  name: name,
  price: price,
  image: image,
});

const getSchema = joi.object({
  id: id.required(),
})

module.exports = { createSchema, updateSchema, getSchema }
