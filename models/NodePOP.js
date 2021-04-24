'use strict';

const mongoose = require('mongoose');

//definimos un esquema
const nodePOPSchema = mongoose.Schema({
        articulo: {type: String, index: true},
        venta: {type: Boolean, index: true},
        precio:  {type: Number, index: true},
        foto: {type: String},
        tags: [String]
    }, {
        collection: 'nodePOPs'
});


nodePOPSchema.statics.lista = function(filtro, limit, skip, fields, sort) {
    const query = NodePOP.find(filtro);
    query.limit(limit);
    query.skip(skip);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}

nodePOPSchema.statics.listaCount = function(filtro) {
    const query = NodePOP.find(filtro).count();
    return query.exec();
}

//creamos el modelo con el esquema definido
const NodePOP = mongoose.model('NodePOP', nodePOPSchema);

//exportamos el modelo
module.exports = NodePOP;
