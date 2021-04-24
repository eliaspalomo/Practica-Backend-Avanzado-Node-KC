var express = require('express');
var router = express.Router();

const NodePOP = require('../models/NodePOP');
const Tag = require('../models/Tag');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const articulo = req.query.articulo;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const tags = req.query.tags;
    
    let limit;
    if (req.query.limit) {limit = parseInt(req.query.limit)}
    let skip;
    if (req.query.skip) {
        const pos = req.query.skip.indexOf('-');
        skip = parseInt(req.query.skip.substring(0, pos)) -1;
    };
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filtro = {};

    if(articulo) {
        filtro.articulo = articulo
    }
    
    if (venta==="V") {
        filtro.venta = true
    } else if (venta==="C") {
        filtro.venta = false
    }
    
    if(precio) {
        const pos = precio.indexOf('-');
        console.log(pos);
        console.log(precio);
        if(pos!==-1) {
            if(pos===0){
                //menor
                filtro.precio = {'$lte':precio.substring(1,precio.length)}
            } else if(pos===(precio.length -1)){
                //mayor
                filtro.precio = {'$gte':precio.substring(0,precio.length -1)}
            } else {
                //entre dos valores
                const precioInf = precio.substring(0, pos);
                const precioSup = precio.substring(pos +1, precio.length);
                filtro.precio = {'$gte':precioInf, '$lte': precioSup}
            }

        } else {
            filtro.precio = precio
        }
    }

    if (tags) {
        filtro.tags = tags
    }

    const nodePOPs = await NodePOP.lista(filtro, limit, skip, fields, sort);
    const total = await NodePOP.listaCount(filtro);

    if (!limit) {limit=total}
    
    const tagsmodel = await Tag.find();
    res.render('index', {title: 'NodePOP', nodePOPs: nodePOPs, tags: tagsmodel, total: total, limit: limit});
      
  } catch (err) {
      next(err);
  }
});

module.exports = router;
