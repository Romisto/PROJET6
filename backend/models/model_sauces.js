// appel de mongoose
const mongoose = require('mongoose');
// création d'un schéma de données qui contient les champs souhaités pour chaque Sauce
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true, default:1, min:1, max:10 },
  likes: { type: Number, required: false, default:0 },
  dislikes: { type: Number, required: false, default:0  },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
  
});
// nous exportons ce schéma en tant que modèle Mongoose appelé « Sauce »
module.exports = mongoose.model('model_sauces', sauceSchema);