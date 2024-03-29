'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('imagedetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      names: {
        type: Sequelize.STRING,
      },
      images: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      descriptions: {
        type: Sequelize.STRING,
      },
      moreimages: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      confirmimages: {
        type: Sequelize.ARRAY(Sequelize.STRING(5000)),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('imagedetails');
  },
};

// "homepage": "https://shot-the-box-website.onrender.com/"
