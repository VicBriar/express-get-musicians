const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db");
const { response } = require("express");

const port = 3000;

//TODO
app.get('/musician/:id', async (request, response) => {
    let musician = await Musician.findByPk(request.params.id);
    response.json(musician);
})

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})