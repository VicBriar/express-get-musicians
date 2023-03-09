const express = require('express');
const router = express.Router();
const {Musician} = require('../models/index')
const {check, body, validationResult} = require('express-validator')


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

router.post(
'/',
check("name").not().isEmpty().trim().withMessage("Name cannot be empty"),
check("instrument").not().isEmpty().trim().withMessage("Instrument cannot be empty"),
async(request,response) => {
    let errors = validationResult(request);
    if(errors.isEmpty()){  
        try{
            let newMusician = request.body
            if(newMusician){
                await Musician.create(newMusician);
                let musicians = await Musician.findAll();
                response.status(200).send(musicians)
            } else {
                console.error("no body provided")
                response.send(400).send("you must provide a musician in body")
            }
        }catch(err){
            console.error(err)
            response.status(500).send("error")
        }
    }else{
        response.status(400).json({errors: errors.array()})
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