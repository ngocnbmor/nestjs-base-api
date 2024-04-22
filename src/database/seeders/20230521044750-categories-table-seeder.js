'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [];
    const admins = await queryInterface.sequelize.query(
      `select * from admins where email='ngocnb@mor.com.vn'`
    );
    if (admins[0].length === 0) {
      return;
    }
    for (let i = 0; i <= 10; i++) {
      categories.push({
        id: uuidv4(),
        admin_id: admins[0][0].id,
        category_name: faker.random.word(),
        created_at: faker.date.birthdate(),
      });
    }

    await queryInterface.bulkInsert('categories', categories);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
