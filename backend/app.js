// import d'express
const express = require('express');
// appel de helmet, il est utilisé pour sécuriser vos en-têtes 
const helmet = require('helmet');
// appel de dotenv qui stocke des variables d'environnement 
require("dotenv").config();

// on importe des routes de sauces
const routesauce = require('./routes/sauces.routes');
// on importe des routes d'utilisateurs
const routeusers = require('./routes/users.routes');
// declare constante app en attribuant le contenu express
const app = express();
// on importe path, donne accés au chemin du système de fichiers
const path = require("path");
// middleware d'helmet
app.use(helmet());

app.use(express.json());

//appel de mongoose
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://" +
process.env.MONGO_DB_USER +
":" +
process.env.MONGO_DB_USER_MDP + "@cluster0.yhctsrg.mongodb.net/" +
process.env.MONGO_DB_MARQUE,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  
  

// definit le CORS

app.use((req, res, next) => {
  // ceux qui ont droit d'accéder à l'API 
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  // les headers acceptés (en-tête)
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // les méthodes acceptés (verbe de requete)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  next();
});

// middleware intercepte la requete et la transforme au bon format
// on peut écrire ceci aussi en faisant appel à body-parser      
/*const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));*/ 


//----------------------------------------------------------------------------------
// MIDDLEWARE DEBUT DE ROUTE
//----------------------------------------------------------------------------------
// pour cette route utiliser le fichier statique
app.use("/images", express.static(path.join(__dirname, "images")));


// pour cette route la on utilise le router de saucesRoutes
app.use("/api/sauces", routesauce);
// pour cette route on utilise le router de l'utilisateur
app.use("/api/auth", routeusers);

// on exporte cette constante pour pouvoir y acceder depuis d'autres fichiers
module.exports = app;