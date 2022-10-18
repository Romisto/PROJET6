// appel de mangoose
const mongoose = require('mongoose');

// création de schéma de connection d'utilisateur
const sauceSchema = mongoose.Schema({

email: { type: String, required: true, unique: true },
password: { type: String, required: true },


});
// exportation du schema modele
module.exports = mongoose.model('Sauce', sauceSchema);