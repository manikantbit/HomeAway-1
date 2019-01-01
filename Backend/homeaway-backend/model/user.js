const Sequelize = require('sequelize');
var Order = require('./order');
var Property = require('./property');

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
//Define User Model
const User = sequelize.define('users', {
    id : { type: Sequelize.INTEGER, autoIncrement: true , primaryKey : true },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    profile_image: Sequelize.STRING,
    phone: Sequelize.STRING,
    about: Sequelize.TEXT,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    type: Sequelize.STRING,
    city: Sequelize.STRING,
    //country: Sequelize.STRING,
    company: Sequelize.STRING,
    school: Sequelize.STRING,
    hometown: Sequelize.STRING,
    languages: Sequelize.STRING,
    gender: Sequelize.STRING,
  });
  User.hasMany(Order,{foreignKey:'user_id',sourceKey:'id'});
  User.hasMany(Property,{foreignKey:'user_id',sourceKey:'id'});

  Order.belongsTo(User,{foreignKey:'user_id',targetKey:'id'});
  Property.belongsTo(User,{foreignKey:'user_id',targetKey:'id'});
  
  //User.sync({force:true});
  module.exports= User;