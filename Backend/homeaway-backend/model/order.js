const Sequelize = require('sequelize');

const sequelize = new Sequelize('homeaway', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});


const Order = sequelize.define('orders', {
  orderid : { type: Sequelize.INTEGER, autoIncrement: true , primaryKey : true },
  prop_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,   // Booked Customer ID
  first_name:Sequelize.STRING,
  last_name: Sequelize.STRING,
  phone: Sequelize.STRING,
  description: Sequelize.TEXT,
  price: Sequelize.DOUBLE,
  bookedFrom: Sequelize.DATEONLY,
  bookedTo: Sequelize.DATEONLY,
  nights: Sequelize.INTEGER
});

//Order.sync();

 
module.exports = Order;