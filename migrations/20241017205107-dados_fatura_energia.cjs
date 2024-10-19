
const { types } = require('pg');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('dados_fatura_energia', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      numero_cliente: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      mes_referencia: {
        type: Sequelize.STRING(150),
        allowNull: false,
      }, 
      eng_eletrica_qtd : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      eng_eletrica_valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      eng_sceee_ims_qtd : {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      eng_sceee_ims_valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      eng_compensada_qtd: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }, 
      eng_compensada_valor : {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      contrib_ilum_publica_valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      pdf: {
        type:  Sequelize.BLOB,
        allowNull: false,
      }
    
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('dados_fatura_energia');
  }
};
