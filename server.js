const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db");

const port = 3000;

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));

//TODO
app.get ('/musicians', async(request,response) =>{
    try{
        let musicians = await Musician.findAll();
        if(musicians){
            response.status(200).json(musicians)
        }else{
            response.status(500).send("musicians not found")
            console.log("musicians not found")
        } 
    }catch(err){
        console.error(err);
    }
    
})

app.get('/musician/:id', async (request, response) => {
    let musician = await Musician.findByPk(request.params.id);
    response.json(musician);
})



app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})