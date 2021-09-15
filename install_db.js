"use strict";

// conexión a la base de datos
const dbConnection = require("./lib/connectMongoose");
// modelo de agentes
const Anuncio = require("./models/Anuncio");
const anuncioData = require("./anunciosiniciales.json");

main().catch((err) => console.log("hubo un error", err));

async function main() {
	await initAnuncios();
	dbConnection.close();
}

async function initAnuncios() {
	// Elimino todos los documentos de la colección de anuncios
	const deleted = await Anuncio.deleteMany();
	console.log(`Eliminados ${deleted.deletedCount} anuncios`);

	// Crear anuncios iniciales
	const anuncios = await Anuncio.insertMany(anuncioData.anuncios);
	console.log(`Creados ${anuncios.length} anuncios`);
}
