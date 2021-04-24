'use strict';
const serverBBDD = 'mongodb://localhost/PracticaEPV';
const mongoose = require('mongoose');

async function connectBBDD() {
    await mongoose.connect(serverBBDD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
}

async function initmodelsBBDD () {
    await connectBBDD().catch(err => {
        console.log('Error al conectarse a la Base de datos', err);
        return
    });
    console.log('Concetado a Base de datos');

    require('./models/NodePOP');
    require('./models/Tag');
    
    const nodePOP = mongoose.model('NodePOP');
    const tag = mongoose.model('Tag');
        
    //Borro todo lo que hubiera anteriormente
    await nodePOP.deleteMany({});
    await tag.deleteMany({});
    console.log('Catalogos anteriores borrados');

    //Inserto los articulos de NodePOP
    const initJSON = require('./models/nodepopinital.json');
    await nodePOP.insertMany(initJSON.nodePOPs);
    console.log('Catalago de nodePOP insertado');

    //Inserto los articulos de Tag con los datos introducidos en NodePOP
    const initTag = [];
    const resultado = await nodePOP.find().select('tags');
    resultado.forEach(tagArticulos => {
        tagArticulos.tags.forEach(tagArticulo => {
            if (!initTag.find(tagArray => tagArray.tag === tagArticulo)){
                const tagArticuloObj = {};
                tagArticuloObj.tag = tagArticulo;
                initTag.push(tagArticuloObj);
            }
        });
    });
    await tag.insertMany(initTag);
    console.log('Catalago de Tag insertado');

    mongoose.disconnect(serverBBDD);
    console.log('Desconcetado de Base de datos');
}

initmodelsBBDD().catch(err => {
    console.log('Error al inicilazarse la BBDD con los articulos iniciales');
    console.log(err);
    mongoose.disconnect(serverBBDD);
});
