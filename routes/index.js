var express = require('express');
var router = express.Router();
const Anuncio = require("../models/Anuncio");
const utils = require ("../lib/utils")

/* GET home page. */

router.get("/", async (req, res, next) => {
	try {
		const nombre = req.query.nombre;
		const venta = req.query.venta;
		const tags = req.query.tags;
		const precio = req.query.precio;
		const skip = parseInt(req.query.skip);
		const limit = parseInt(req.query.limit);
		const select = req.query.select;

		const filtro = {};

		if (nombre) {
			filtro.nombre = nombre;
		} else if (venta) {
			filtro.venta = venta;
		} else if (tags) {
			filtro.tags = tags;
		} else if (precio) {
            let rango = precio.split('-')
            console.log(rango)
			if (rango[0] !== '' & rango [1] !== '') {
				filtro.precio = { $gte: rango[0], $lte: rango[1] };
			} else if (rango[0] !== '' & rango [1] === '')  {
				filtro.precio = { $gte: rango[0] };
			} else if (rango[0] === '' & rango [1] !== '')  {
				filtro.precio = { $lte: rango[1] };
			}
		}
		const anuncios = await Anuncio.lista(filtro, skip, limit, select);
    res.render('index', { title: 'Nodepop', anuncios});
	} catch (err) {
		next(err);
    return;
	}
});


module.exports = router;
