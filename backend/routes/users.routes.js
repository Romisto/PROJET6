// appel de express
const express = require("express");
// definition de express.Router
const router = express.Router();

// on importe la logique des routes
const userCtrl = require("../controllers/user");
//----------------------------------------------------------------------------------
// ROUTES USER
//----------------------------------------------------------------------------------
// intercepte les requetes post d'inscription
router.post("/signup", userCtrl.signup);
// intercepte les requetes post d'authentification
router.post("/login", limiter, userCtrl.login);
//----------------------------------------------------------------------------------
// on exporte router
module.exports = router;