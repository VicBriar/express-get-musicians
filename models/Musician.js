const {Sequelize, sequelize} = require('../config/db');

let Musician = sequelize.define('musician', {
    name: Sequelize.STRING,
    instrument : Sequelize.STRING
},{timestamps: false});

module.exports = {
    Musician
};