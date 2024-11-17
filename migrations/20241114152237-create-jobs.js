'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobDocuments', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      jobId: {
        type: Sequelize.UUID,
        references: {
          model: 'Jobs',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      portalId: {
        type: Sequelize.UUID,
        references: {
          model: 'Portals',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      documentUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      documentType: {
        type: Sequelize.ENUM('pdf', 'doc', 'docx'),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('JobDocuments');
  }
};