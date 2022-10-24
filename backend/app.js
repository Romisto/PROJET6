// import express et mongodb
const express = require('express');
const mongoose = require('mongoose');
const routesauce = require('./routes/sauces.routes');
const routeusers = require('./routes/users.routes');
// declare constante app en attribuant le contenu express
const app = express();



mongoose.connect('mongodb+srv://arogi:Romain1102@cluster0.yhctsrg.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  app.use('/api/users',routeusers);
  app.use('/api/sauces',routesauce);
  


//Ajout des middlewares
// enregistre
app.use((req, res, next) => {
    console.log("Requête reçue !");
    next();
    });
 // ajoute un code d'état  à la réponse et passe l'exécution ;
app.use((req, res, next) => {
    res.status(201);
    next();
});
  //envoie la réponse JSON et passe l'exécution ;      
app.use((req, res, next) => {
    res.json({ message: "Votre requête a bien été reçue !" });
    next();
});

// reponse envoyé avec succes
app.use((req, res, next) => {
    console.log("Réponse envoyée avec succès !");
    });

module.exports = app;