const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');
const model_sauces = require('./models/model_sauces');
const model_users = require('./models/model_users');
const sauces_controllers = require('./controllers/sauces');

mongoose.connect('mongodb+srv://<arogi>:<Romain1102>@cluster0.yhctsrg.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.get ('/sauces', sauces_controllers.getAllSauce);

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);