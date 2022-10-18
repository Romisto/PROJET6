const express = require('express');
const app = express();
const mongoose = require('mongoose');
const model_sauces = require('./models/model_sauces');
const model_users = require('./models/model_users');
const sauces_controllers = require('./controllers/sauces');

mongoose.connect('mongodb+srv://<arogi>:<Romain1102>@cluster0.yhctsrg.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use ('/sauces', sauces_controllers.getAllSauce);

app.set('port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000,()=>{
  console.log('connecté au serveur');
});
//const server = http.createServer(app);

//server.listen(process.env.PORT || 3000);
