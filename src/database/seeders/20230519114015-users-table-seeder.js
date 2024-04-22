'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [];

    for (let i = 0; i <= 10; i++) {
      users.push({
        id: uuidv4(),
        email: faker.internet.email(),
        name: faker.internet.userName(),
        password: bcrypt.hashSync('123456', 10),
        phone: faker.phone.number(),
        introduction: faker.lorem.word(),
        nickname: faker.internet.userName(),
        gender: faker.name.sex(),
        date_of_birth: faker.date.birthdate(),
        address: faker.address.county(),
        status: true,
        created_at: faker.date.birthdate(),
      });
    }

    await queryInterface.bulkInsert('users', users);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
