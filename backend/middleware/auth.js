// appel du (jsonweb)token
const jwt = require("jsonwebtoken");
//appel du dotenv
const dotenv = require('dotenv')
dotenv.config()
// on exporte la requete
module.exports = (req, res, next) => {
  // essaye
  try {console.log(req.headers.authorization)
    // on utilise le header authorization de la requete (CORS) on split le tableau et on récupère l'élément à l'indice 1 (Bearer Token)
    const token = req.headers.authorization.split(" ")[1];
    // décoder le token en vérifiant qu'il correspond avec sa clef secrète
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_ALEATOIRE);
    // on récupère le user id décodé par le jwt.vérify
    const userId = decodedToken.userId;
    // on rajoute l'objet userId à l'objet requete
    req.auth = { userId:userId };
    // s'il y a un userId et que les id sont différants entre requete et token
    if (req.body.userId && (req.body.userId !== userId)) {
      // renvoi un message
      res.status(403).json({ message: "L'identifiant de l'utilisateur est invalide" });
      // sinon c'est que c'est bon
    } else {
      // passe au suivant
      next();
    }
    // s'il y a une erreur
  } catch (error) {
    // reponse status 401 Unauthorized avec un message en json
    res.status(401).json({ error });
  }
};
