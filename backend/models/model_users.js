// appel de mangoose
const mongoose = require('mongoose');
// appel de mongoose-unique-validator après installation
const uniqueValidator = require("mongoose-unique-validator");

// création de schéma de connection d'utilisateur
const usersSchema = mongoose.Schema({

email: { type: String, required: true, unique: true },
password: { type: String, required: true },


});
// utilisation du schema via le plugin de mongoose-unique-validator
usersSchema.plugin(uniqueValidator);
// exportation du schema modele
module.exports = mongoose.model('User', usersSchema);