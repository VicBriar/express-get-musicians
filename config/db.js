const path = require('path');
const { Sequelize, Model } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../db.sqlite',
    logging: false
});

module.exports = {
    sequelize,
    Sequelize
};
