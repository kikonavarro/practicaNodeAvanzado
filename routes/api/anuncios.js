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
			filtro.nombre = nombre;
		} else if (venta) {
			filtro.venta = venta;
		} else if (tags) {
			filtro.tags = tags;
		} else if (precio) {
			if (precio === "10-50") {
				filtro.precio = { $gte: 10, $lte: 50 };
			} else if (precio === "10-") {
				filtro.precio = { $gte: 10 };
			} else if (precio === "-50") {
				filtro.precio = { $lte: 50 };
			} else if (precio === "50") {
				filtro.precio = 50;
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
