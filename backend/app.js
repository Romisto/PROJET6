const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<arogi>:<Romain1102>@cluster0.yhctsrg.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);