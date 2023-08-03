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

  async create(data) {
    const newCategory = {
      id: faker.string.uuid(),
      ...data
    }
    this.categories.push(newCategory);
    return newCategory
  }

  async find() {
    return this.categories;
  }

  async findOne (categoryId) {
    const index = this.categories.findIndex(item => item.id === categoryId);
    if ( index === -1 ){
      throw new Error('Category not found');
    }
    return this.categories[index]
  }

  async update(id, changes) {
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

  async delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if( index === -1 ) {
      throw new Error('Category not found');
    }
    this.categories.splice(index, 1);
    return { id }
  }
}

module.exports = CategoriesService;
