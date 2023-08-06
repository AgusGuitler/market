const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(3).max(20);

const createSchema = joi.object({
  name: name.required(),
});

const updateSchema = joi.object({
  name: name,
});

const getSchema = joi.object({
  id: id.required(),
})

module.exports = { createSchema, updateSchema, getSchema }
