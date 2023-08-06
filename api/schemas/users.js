const joi = require('joi')
  .extend(require('@joi/date'));

const id = joi.string().uuid();
const avatar = joi.string().uri();
const birthday = joi.date().format('DD-MM-YYYY');
const email = joi.string().email();
const firstName = joi.string().min(3).max(40);
const lastName = joi.string().min(3).max(40);
const sex = joi.string().min(3).max(10);

const createSchema = joi.object({
  avatar: avatar.required(),
  birthday: birthday.required(),
  email: email.required(),
  firstName: firstName.required(),
  lastName: lastName.required(),
  sex: sex.required()
});

const updateSchema = joi.object({
  avatar: avatar,
  birthday: birthday,
  email: email,
  firstName: firstName,
  lastName: lastName,
  sex: sex
});

const getSchema = joi.object({
  id: id.required(),
})

module.exports = { createSchema, updateSchema, getSchema }
