const Sequelize = require('sequelize');
var Order = require('./order');

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
//Define Property Model
const Property = sequelize.define('properties', {
    propid : { type: Sequelize.INTEGER, autoIncrement: true , primaryKey : true },
    user_id: Sequelize.INTEGER,     //Owner user_id
    location: Sequelize.STRING,
    proptype: Sequelize.STRING,
    headline: Sequelize.STRING,
    noOfRooms: Sequelize.STRING,
    noOfBath: Sequelize.STRING,
    allowedGuest: Sequelize.STRING,
    image1: Sequelize.STRING,
    image2: Sequelize.STRING,
    image3: Sequelize.STRING,
    image4: Sequelize.STRING,
    price: Sequelize.DOUBLE,
    amenities: Sequelize.TEXT,
    availFrom: Sequelize.DATEONLY,
    availTo: Sequelize.DATEONLY,
  });
  Property.hasMany(Order, {foreignKey: 'prop_id', sourceKey: 'propid'});

  Order.belongsTo( Property, {foreignKey: 'prop_id',targetKey:'propid'});
  //Property.sync(force=true);
  module.exports= Property;