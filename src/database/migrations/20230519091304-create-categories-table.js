'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('categories', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        admin_id: {
          type: Sequelize.UUID,
          allowNull: false,
          reference: {
            model: 'admins',
            key: 'id',
          },
          onUpdate: 'cascade',
          onDelete: 'RESTRICT',
        },
        category_name: {
          type: Sequelize.STRING(150),
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        deleted_at: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories');
  },
};
