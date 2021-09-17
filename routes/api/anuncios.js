"use strict";

const express = require("express");
const router = express.Router();
const Anuncio = require("../../models/Anuncio");

// GET /api/anuncios
// devuelve una lista de anuncios

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
			filtro.nombre = new RegExp('^' + nombre, "i");
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
		res.json({ results: anuncios });
	} catch (err) {
		next(err);
	}
});

// GET
// Lista de Tags

router.get("/tags", async (req, res, next) => {
	try {
        const tags = await Anuncio.find().distinct('tags')
		res.json({result: tags})
	} catch (err) {
		next(err);
	}
});
// GET /api/anuncios:id
// Obtener un anuncio

router.get("/:id", async (req, res, next) => {
	try {
		const _id = req.params.id;
		const anuncio = await Anuncio.find({ _id: _id });
		res.json({ result: anuncio });
	} catch (err) {
		next(err);
	}
});

// POST /api/anuncios
// crear un anuncio

router.post("/", async (req, res, next) => {
	try {
		const anuncioData = req.body;
		const anuncio = new Anuncio(anuncioData);
		const anuncioCreado = await anuncio.save();
		res.status(201).json({ result: anuncioCreado });
	} catch (err) {
		next(err);
	}
});

// DELETE /api/anuncios
// borrar un anuncio

router.delete("/:id", async (req, res, next) => {
	try {
		const _id = req.params.id;
		await Anuncio.deleteOne({ _id: _id });
		res.json();
	} catch (err) {
		next(err);
	}
});

// PUT /api/anuncios
// Actualizar un anuncio

router.put("/:id", async (req, res, next) => {
	try {
		const _id = req.params.id;
		const anuncioData = req.body;
		const anuncioActualizado = await Anuncio.findOneAndUpdate(
			{ _id: _id },
			anuncioData,
			{
				new: true, // esto es para que devuelva el estado final del documento
			}
		);
		res.json({ anuncioActualizado });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
