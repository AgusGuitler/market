const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UsersService {

  constructor() {
    this.users = [];
    this.generate();
  }


  generate(){

    for ( let index = 0; index < 100; index++ ) {
      this.users.push({
        id: faker.string.uuid(),
        avatar: faker.image.avatar(),
        birthday: faker.date.birthdate(),
        email: faker.internet.email(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        sex: faker.person.sexType()
      })
    }
  }

    async create(data) {
      const newUser = {
        id: faker.string.uuid(),
        ...data
      }
      this.users.push(newUser);
      return newUser;
    }

    async find() {
      return this.users;
    }

    async findOne(id) {
      const user = this.users.find(item => item.id === id);
      if ( !user ){
        throw boom.notFound('User not found');
      }
      return user
    }

    async update(id, changes) {
      const index = this.users.findIndex(item => item.id === id);
      if (index === -1) {
        throw boom.notFound('user not found');
      }
      const user = this.users[index];
      this.users[index] = {
        ...user,
        ...changes
          }
      return this.users[index];
    }

    async delete(id) {
      const index = this.users.findIndex(item => item.id === id);
      if (index === -1) {
        throw boom.notFound('user not found');
      }
      this.users.splice(index, 1);
      return { id };
    }
}

module.exports = UsersService;
