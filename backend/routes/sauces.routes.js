//pour créer le routeur on a besoin d'express
const express = require("express");
// on créer un routeur avec la méthode Router() d'express
const router = express.Router();

const auth = require('../middleware/auth');
const saucesCtrl = require('../controllers/sauces');

// on appelle multer pour ajout d'image
const multer = require("../middleware/multer-config");
// on importe la logique des routes
//----------------------------------------------------------------------------------
// ROUTES SAUCES
//----------------------------------------------------------------------------------
// intercepte les requetes get
router.get("/sauces", auth, saucesCtrl.getAllSauce);
// intercepte les requetes get
router.get("/sauces/:id", auth, saucesCtrl.getOneSauce);
// intercepte requete post de creation de sauce
router.post("/sauces", auth, multer, saucesCtrl.createSauce);
// intercepte les requetes put (modification/mise à jour)
router.put("/sauces/:id", auth, multer, saucesCtrl.modifySauce);
// intercepte les requetes delete
router.delete("/sauces/:id", auth, multer, saucesCtrl.deletesauce);
// intercepte requete post de like
router.post("/sauces/:id/like", auth, multer, saucesCtrl.likeSauce);
//----------------------------------------------------------------------------------
// on exporte router
module.exports = router;
