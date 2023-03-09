const express = require("express");
const app = express();
const {Musician, Band} = require("./models/index")
const {sequelize} = require("./config/db");
const musicianRouter = require('./routers/musician')

const port = 3000;

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

app.use('/musicians',musicianRouter)

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})