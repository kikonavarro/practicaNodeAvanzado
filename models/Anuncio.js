'use strict'

const mongoose = require('mongoose')


// definimos un esquema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

anuncioSchema.statics.lista = function (filtro, skip, limit, select) {
    const query = Anuncio.find(filtro)
    query.skip(skip)
    query.limit(limit)
    query.select(select)
    return query.exec()
}
// creamos el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema)

module.exports = Anuncio;