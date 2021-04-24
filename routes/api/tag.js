var express = require('express');
var router = express.Router();

const Tag = require('../../models/Tag');

/* GET /api/tag */
router.get('/', async function(req, res, next) {
    try {
        const tag = req.query.tag;
        
        const filtro = {};

        if(tag) {
            filtro.tag = tag
        }

        const resultado = await Tag.lista(filtro);
        res.json(resultado);
    } catch (err) {
        next(err);
    }
});

// GET /api/tag:id
router.get('/:id', async (req, res, next) => {
    try{
        const _id = req.params.id;

        const tag = await Tag.findOne({_id: _id});

        if(!tag){
            return res.status(404).json({error: 'Not found'})
        }

        res.json({result: tag});

    } catch (err){
        next(err);
    }
});

// POST /api/tag (body) -> crear un tag
router.post('/', async(req, res, next) => {
    try {
        const tagData = req.body;

        const tag = new Tag(tagData);

        const tagCreado = await tag.save();

        res.status(201).json({tagCreado});
    } catch (error) {
        next(error);
    }
});

// PUT /api/tag:id (body) -> para actualizar un tag
router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const tagData = req.body;

        const tagActualizado = await Tag.findOneAndUpdate({_id: _id}, tagData, {
            new: true,
            useFindAndModify: false
        }); 

        res.json({result: tagActualizado});
    } catch (error) {
        next(error);
    }
});

// DELETE /api/tag:id -> elimina una tag
router.delete('/:id', async (req, res, next) =>{
    try {
        const _id = req.params.id;

        await Tag.deleteOne({_id: _id});

        res.json();
    } catch (error) {
        next(error)
    }
});

module.exports = router;
