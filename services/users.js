const { faker } = require('@faker-js/faker');

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

    create() {

    }

    find() {
      return this.users;
    }

    findOne(id) {
      return this.users.find(item => item.id === id);
    }

    update(id, changes) {
      const index = this.users.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error('user not found');
      }
      const user = this.users[index];
      this.users[index] = {
        ...user,
        ...changes
          }
      return this.users[index];
    }

    delete(id) {
      const index = this.users.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error('user not found');
      }
      this.users.splice(index, 1);
      return { id };
    }
}

module.exports = UsersService;
