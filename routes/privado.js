var express = require("express");
var router = express.Router();

/* GET /privado */
router.get("/privado", function (req, res, next) {
	
    if (!req.session.usuarioLogado) {
        res.redirect('/login')
        return
    }
    res.render("privado");
});

module.exports = router;
