const express = require('express');
const { faker } = require('@faker-js/faker');

const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
  const users = [];

  for ( let index = 0; index < 100; index++ ) {
    users.push({
      avatar: faker.image.avatar(),
      birthday: faker.date.birthdate(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      sex: faker.person.sexType()
    })
  }
  res.json(users);
})

usersRouter.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const body = req.body;

  res.status(200).json({
    userId,
    data: body,
  })
})

usersRouter.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  });
})

usersRouter.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.status(202).json({
    message: 'update',
    data: body,
    id,
  });
})

usersRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: 'deleted',
    id,
  });
})

module.exports = usersRouter;
