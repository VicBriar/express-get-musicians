const {Musician} = require("../models/index")
const {sequelize} = require("../config/db");
const seedMusician = require("./seedData");

const syncSeed = async () => {
    await sequelize.sync({force: true});
    seedMusician.map(musician => Musician.create(musician));
}

syncSeed()

