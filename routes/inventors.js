const express = require('express');
const router = express.Router();
const dataInventor = require('../data/inventordb');
const joi = require('joi');



// /api/inventors

router.get('/',async (req,res,next)=>{
    let inventors = await dataInventor.getInventors();
    res.json(inventors);
});


router.get('/:id',async (req,res)=>{
    const inventor = await dataInventor.getInventor(req.params.id);
    if(inventor){
        res.json(inventor);
    }else{
        res.status(404).send('No se encontró inventor.');
    }
});

router.post('/', async (req,res)=>{
    
    const schema = joi.object({
        first: joi.string().alphanum().min(3).required,
        last: joi.string().alphanum().min(3).required,
        year: joi.number().min(1400).max(2021).required
    });
    const result = schema.validate(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }else{
        let inventor = req.body;
        inventor = await dataInventor.addInventor(inventor);
        res.json(inventor);
    }
});

router.put('/:id', async (req,res)=>{
    // validación

    const schema = joi.object({
        first: joi.string().alphanum().min(3).required,
        last: joi.string().alphanum().min(3).required,
        year: joi.number().min(1400).max(2021).required
    });
    const result = schema.validate(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }else{
        let inventor = req.body;
        inventor._id = req.params.id;
        inventor = await dataInventor.updateInventor(inventor);
        res.json(inventor);
    }
});

router.delete('/:id', async (req,res)=>{
    const inventor = await dataInventor.getInventor(req.params.id);
    if(inventor){
        dataInventor.deleteInventor(req.params.id);
    }else{
        res.status(404).send('Inventor no encontrado.');
    }
})

module.exports = router;