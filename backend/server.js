//on a accès à un objet http qui nous permet de créer un serveur
const http = require('http');
//cette methode prend comme argument la fonction qui sera appelé à chaque requête reçue par le serveur

const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du serveur !');
});

server.listen(process.env.PORT || 3000);