const express = require('express');
const router = express.Router();
const {Musician} = require('../models/index')


router.get ('/', async(request,response) =>{
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

router.get('/:id', async (request, response) => {
    let musician = await Musician.findByPk(request.params.id);
    response.json(musician);
})

router.post('/', async(request,response) => {
    try{
        let newMusician = request.body
        if(newMusician){
            await Musician.create(newMusician);
            response.status(200).send(`new musician was sucessfully added to database!`)
        } else {
            console.error("no body provided")
            response.send(400).send("you must provide a musician in body")
        }
    }catch(err){
        console.error(err)
        response.status(500).send("error")
    }
    
})

router.put('/:id', async (request, response) =>{
    try{
        let id = request.params.id;
        let updatedMusician = request.body
        let musician  = await Musician.findByPk(id);
        if(musician){
            musician.set(updatedMusician);
            await musician.save();
            response.status(200).send("musician updated");
            console.log(`musician ${musician} has been updated`);
        }
    }catch(err){
        response.status(500).send("error");
        console.error(err);
    }
})

router.delete('/:id', async (request, response) => {
    try{
        let id = request.params.id;
        let musician = await Musician.findByPk(id);
        if(musician){
            musician.destroy()
            response.status(200).send("deleletion sucessful!")
        }else{
            response.status(404).send("musician not found!")
        }
    }catch (err){
        console.error(err)
        response.status(500).send("error!")
    }
})

module.exports = router;