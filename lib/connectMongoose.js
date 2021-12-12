"use strict";
const mongoose = require("mongoose");


mongoose.connection.on("error", (err) => {
	console.log("Error de conexión", err);
	process.exit(1);
});

mongoose.connection.once("open", () => {
	console.log("Conectado a MongoDB a la BD:", mongoose.connection.name);
});

// me conecto a la BD
mongoose.connect("mongodb://localhost/nodepopAnuncios", {});

// opcional

module.exports = mongoose.connection;
