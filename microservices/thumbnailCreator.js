"use strict";

const { Responder } = require("cote");
var Jimp = require("jimp");

// declaramos el microservicio

const responder = new Responder({ name: "creacion de thumbnail" });

// lógica del microservicio

responder.on("convertir-thumbnail", async (req, done) => {
	const { foto } = req;
	const fotoPath = `public\\images\\${foto}`;

	Jimp.read(fotoPath)
		.then((fotoToThumbnail) => {
			fotoToThumbnail
				.resize(100, 100)
				.write(`public\\thumbnail-images\\thumbnail_${foto}`);
		})
		.catch((err) => {
			console.error(err);
		});
	const result = "creación de thumbnail";
	await done(result);
});
