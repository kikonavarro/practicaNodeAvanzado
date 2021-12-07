"use strict";

const { Usuario } = require("../models");

class LoginController {
	index(req, res, next) {
		res.locals.error = '';
		res.render("login");
	}

	async post(req, res, nest) {
		try {
			const { email, password } = req.body;

			// buscar el usuario en la base de datos
			const usuario = await Usuario.findOne({ email });

			// si no lo encuentro o no coincide la contrasela le muestro un error
			if (!usuario || usuario.comparePasssword(password)) {
				res.locals.error = "Invalid credentials";
				res.render("login");
			}
			// si lo encuentro y la contraseña coincide le muestro su zona privada

			res.redirect("privado");
		} catch (err) {
			next(err);
		}
	}
}

module.exports = LoginController;
