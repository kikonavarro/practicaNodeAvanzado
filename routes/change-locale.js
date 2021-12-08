const express = require("express");
const router = express.Router();

/** GET /change-locale */

router.get("/:locale", (req, res, next) => {
	// recogemos a que idioma queremos cambiar
	const locale = req.params.locale;

	// poner una cookien en la respuesta que indique el idioma que queremos.
	res.cookie("nodeapi-locale", locale, {
		maxAge: 1000 * 60 * 24,
	});
	// hacer una redirección a la página donde estaba el usuario
	res.redirect(req.get("referer"));
});

module.exports = router;
