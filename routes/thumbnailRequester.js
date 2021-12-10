"use strict";

const { Requester } = require("cote");

const requester = new Requester({ name: "publisher" });

const thumbnailRequester = (foto) => {
	const req = {
		type: "convertir-thumbnail",
		foto: foto,
	};
	requester.send(req, (done) => {
		console.log(`transform ${foto} = ${req} ${done}`);
	});
};

module.exports = thumbnailRequester;
