// appel de express
const express = require("express");
// definition de express.Router
const router = express.Router();

//importation du middleware
const auth = require('../middleware/auth');

// on importe la logique des routes
const userCtrl = require('../controllers/users');
//----------------------------------------------------------------------------------
// ROUTES USER
//----------------------------------------------------------------------------------
// intercepte les requetes post d'inscription
router.post("/auth/signup", userCtrl.signup);
// intercepte les requetes post d'authentification
router.post("/auth/login", userCtrl.login);
//----------------------------------------------------------------------------------
// on exporte router
module.exports = router;