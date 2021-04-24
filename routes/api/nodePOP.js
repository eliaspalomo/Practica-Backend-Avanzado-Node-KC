var express = require('express');
var router = express.Router();

const NodePOP = require('../../models/NodePOP');
const Tag = require('../../models/Tag');

/* GET /api/nodePOP */
router.get('/', async function(req, res, next) {
    try {
        const articulo = req.query.articulo;
        const venta = req.query.venta;
        const precio = req.query.precio;
        const tags = req.query.tags;
        
        const limit = parseInt(req.query.limit);
        const skip = parseInt(req.query.skip);
        const fields = req.query.fields;
        const sort = req.query.sort;

        const filtro = {};

        if(articulo) {
            filtro.articulo = articulo
        }

        if (venta) {
            filtro.venta = venta
        }

        if(precio) {
            filtro.precio = precio
        }

        if (tags) {
            filtro.tags = tags
        }

        const resultado = await NodePOP.lista(filtro, limit, skip, fields, sort);
        res.json(resultado);
    } catch (err) {
        next(err);
    }
});

// GET /api/nodePOP:id
router.get('/:id', async (req, res, next) => {
    try{
        const _id = req.params.id;

        const nodePOP = await NodePOP.findOne({_id: _id});

        if(!nodePOP){
            return res.status(404).json({error: 'Not found'})
        }

        res.json({result: nodePOP});

    } catch (err){
        next(err);
    }
});

// POST /api/nodePOP (body) -> crear un nodePOP
router.post('/', async(req, res, next) => {
    try {
        const nodePOPData = req.body;

        const nodePOP = new NodePOP(nodePOPData);

        const nodePOPCreado = await nodePOP.save();
        
        //Añado los tags si fuera necesario
        Tag.addTags(req.body.tags);

        res.status(201).json({nodePOPCreado});
    } catch (error) {
        next(error);
    }
});

// PUT /api/nodePOP:id (body) -> para actualizar un nodePOP
router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const nodePOPData = req.body;

        const nodePOPActualizado = await NodePOP.findOneAndUpdate({_id: _id}, nodePOPData, {
            new: true,
            useFindAndModify: false
        }); 

        //Añado los tags si fuera necesario
        await Tag.addTags(req.body.tags);

        res.json({result: nodePOPActualizado});
    } catch (error) {
        next(error);
    }
});

// DELETE /api/nodePOP:id -> elimina una nodePOP
router.delete('/:id', async (req, res, next) =>{
    try {
        const _id = req.params.id;

        await NodePOP.deleteOne({_id: _id});

        res.json();
    } catch (error) {
        next(error)
    }
});

module.exports = router;
