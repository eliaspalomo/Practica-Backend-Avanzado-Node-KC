'use strict';

const mongoose = require('mongoose');

//definimos un esquema
const tagSchema = mongoose.Schema({
        tag: {type: String, index: true}
    }, {
        collection: 'Tags'
});


tagSchema.statics.lista = function(filtro) {
    const query = Tag.find(filtro);
    return query.exec();
}

tagSchema.statics.addTags = async function(newTags) {
    for (let tagAdd of newTags) {
        const count = await Tag.find({tag: tagAdd}).countDocuments();
        if(count===0){
            const tag = new Tag({tag: tagAdd});

            await tag.save();
        }
    }
}

//creamos el modelo con el esquema definido
const Tag = mongoose.model('Tag', tagSchema);

//exportamos el modelo
module.exports = Tag;
