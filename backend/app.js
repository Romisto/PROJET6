// import d'express
const express = require('express');
// appel de helmet, il est utilisé pour sécuriser vos en-têtes 
const helmet = require('helmet');

// on importe des routes de sauces
const routesauce = require('./routes/sauces.routes');
// on importe des routes d'utilisateurs
const routeusers = require('./routes/users.routes');
// declare constante app en attribuant le contenu express
const app = express();
// middleware d'helmet
app.use(helmet());

//appel de mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://arogi:Romain1102@cluster0.yhctsrg.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  
  

// definit le CORS

app.use((req, res, next) => {
  // origine, droit d'accéder c'est tout le monde '*'
  res.setHeader("Access-Control-Allow-Origin", "*");
  // headers, ce sont les headers acceptés (en-tête)
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // methods,  ce sont les méthodes acceptés (verbe de requete)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH"
  );
  next();
});

// middleware intercepte la requete et la transforme au bon format
app.use(express.json());

//----------------------------------------------------------------------------------
// MIDDLEWARE DEBUT DE ROUTE
//----------------------------------------------------------------------------------
// pour cette route utiliser le fichier statique
//app.use("/images", express.static(path.join(__dirname, "images")));

// pour cette route on utilise le router de l'utilisateur
app.use("/api/auth", routeusers);
// pour cette route la on utilise le router de saucesRoutes
app.use("/api/sauces", routesauce);

// on exporte cette constante pour pouvoir y acceder depuis d'autres fichiers
module.exports = app;