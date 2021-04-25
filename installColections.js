'use strict';

require('dotenv').config();

const serverBBDD = process.env.MONGODB_CONNECTION_STR;
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
    const Usuario = require('./models/Usuario');
    
    const nodePOP = mongoose.model('NodePOP');
    const tag = mongoose.model('Tag');
    const usuario = mongoose.model('Usuario');
        
    //Borro todo lo que hubiera anteriormente
    await nodePOP.deleteMany({});
    await tag.deleteMany({});
    await usuario.deleteMany({});
    console.log('Catalogos anteriores borrados');

    //Inserto los articulos de NodePOP
    const initJSON = require('./models/nodepopinital.json');
    const resultPops = await nodePOP.insertMany(initJSON.nodePOPs);
    console.log(`Catalago de nodePOP insertado con ${resultPops.length} Tag${resultPops.length > 1 ? 's' : ''}.`);

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
    const resultTags = await tag.insertMany(initTag);
    console.log(`Catalago de Tag insertado con ${resultTags.length} Tag${resultTags.length > 1 ? 's' : ''}.` );

    //Inserto los articulos de Usuaios
    const initUsuarios = [{
        email: 'usuario1@example.com',
        password: await Usuario.hashPassword('1234')
      },{
        email: 'usuario2@example.com',
        password: await Usuario.hashPassword('1234')
      }];
    const resultUsuarios = await usuario.insertMany(initUsuarios);
    console.log(`Catalago de Usuarios insertado con ${resultUsuarios.length} Usuario${resultUsuarios.length > 1 ? 's' : ''}.`);

    mongoose.disconnect(serverBBDD);
    console.log('Desconcetado de Base de datos');
}

initmodelsBBDD().catch(err => {
    console.log('Error al inicilazarse la BBDD con los catalogos iniciales');
    console.log(err);
    mongoose.disconnect(serverBBDD);
});
