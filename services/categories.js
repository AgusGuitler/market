const { faker } = require('@faker-js/faker');

class CategoriesService {

  constructor(){
    this.categories = [];
    this.generate();
  }

  generate() {
    const limit = 10;

    for ( let index = 0; index < limit; index++ ) {
      this.categories.push({
        id: faker.string.uuid(),
        name: faker.science.chemicalElement(),
      });
    }
  }

  create() {

  }

  find() {
    return this.categories;
  }

  findOne(categorieId) {
    return this.categories.find(item => item.id === categorieId);
  }

  update() {

  }

  delete() {

  }
}

module.exports = CategoriesService;
