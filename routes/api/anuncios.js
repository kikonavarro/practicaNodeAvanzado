"use strict";

const express = require("express");
const router = express.Router();
const Anuncio = require('../../models/Anuncio')

// /api/anuncios
// devuelve una lista de anuncios

router.get("/", async (req, res, next) => {
	const anuncios = await Anuncio.find();
	res.json({ results: anuncios });
});
module.exports = router;
