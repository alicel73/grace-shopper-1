const Sequelize = require('sequelize');
const conn = require('./conn');

const LineItem = conn.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER
    // allowNull: false,
    // validate: {
    //   notEmpty: true
    // }
  },
  price: {
    type: Sequelize.DECIMAL,
    isNumeric: true
  },
  name: {
    type: Sequelize.STRING
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});

module.exports = LineItem;
