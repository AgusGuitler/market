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
        name: faker.word.words(),
      });
    }
  }

  create(data) {
    const newCategory = {
      id: faker.string.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory
  }

  find() {
    return this.categories;
  }

  findOne (categoryId) {
    return this.categories.find(item => item.id === categoryId);
  }

  update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if ( index === -1 ) {
      throw new Error('Category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    }
    return this.categories[index]
  }

  delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if( index === -1 ) {
      throw new Error('Category not found');
    }
    this.categories.splice(index, 1);
    return { id }
  }
}

module.exports = CategoriesService;
