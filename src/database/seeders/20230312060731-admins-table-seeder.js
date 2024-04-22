/* eslint-disable */

'use strict';

const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const data = await queryInterface.sequelize.query(`select id from admins where email='utiyama@cet-app.com'`);
    if (data[0].length > 0) {
      return;
    }
    await queryInterface.bulkInsert('admins', [{
      id: uuidv4(),
      email: 'ngocnb@mor.com.vn',
      name: 'NgocNB',
      password: bcrypt.hashSync('123456', 10),
    }]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('admins', null, {});
  },
};
