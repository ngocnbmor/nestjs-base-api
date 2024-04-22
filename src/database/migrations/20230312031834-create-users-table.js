'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },

        area_id: {
          type: Sequelize.UUID,
          allowNull: true,
        },

        email: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        name: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        token: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        fcm_token: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        phone: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        introduction: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        nickname: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        gender: {
          type: Sequelize.STRING(255),
          allowNull: true,
          defaultValue: 0,
        },
        date_of_birth: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        address: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        image: {
          type: Sequelize.TEXT,
          allowNull: true,
        },

        is_owner_store: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false,
        },

        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
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
      console.log(error);
      await transaction.rollback();
    }
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
