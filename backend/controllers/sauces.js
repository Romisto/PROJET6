// on appelle le modèle de la sauce
const Sauce = require("../models/Sauce_model");
// on appelle fs (filesystem) qui permet d'aller dans les fichiers
const fs = require("fs");
const { error } = require("console");
//----------------------------------------------------------------------------------
// LOGIQUE GETALLSAUCE
//----------------------------------------------------------------------------------
// accède à toutes les sauces

exports.getAllSauce = (req, res, next) => {
  // on veut la liste complète de Sauce alors on utilise find() sans argument
  Sauce.find()
    //  status 200 OK et sauces en json
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    // erreur un status 400 Bad Request et l'erreur en json
    .catch((error) => res.status(400).json({ error }));
};
//----------------------------------------------------------------------------------
// LOGIQUE GETONESAUCE
//----------------------------------------------------------------------------------
// accède à une sauce

exports.getOneSauce = (req, res, next) => {
  // on utilise le modele mangoose et findOne pour trouver un objet via la comparaison req.params.id
  Sauce.findOne({ _id: req.params.id })
    // status 200 OK et l'élément en json
    .then((sauce) => res.status(200).json(sauce))
    // si erreur envoit un status 404 Not Found et l'erreur en json
    .catch((error) => res.status(404).json({ error }));
};
//----------------------------------------------------------------------------------
// LOGIQUE CREATESAUCE
//----------------------------------------------------------------------------------
// créer une sauce
exports.createSauce = (req, res, next) => {
  // on extrait le sauce de la requete via le parse
  
  const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce= new sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    sauce.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
 };
      
  
//----------------------------------------------------------------------------------
// LOGIQUE MODIFYSAUCE
//----------------------------------------------------------------------------------
// modifie une sauce
exports.modifySauce = (req, res, next) => {
  // l'id de la sauce est l'id inscrit dans l'url
        const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };
//----------------------------------------------------------------------------------
// LOGIQUE DELETESAUCE
//----------------------------------------------------------------------------------
// efface une sauce
exports.deletesauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(thing => {
            if (Sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = Sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };
//----------------------------------------------------------------------------------
// LOGIQUE LIKESAUCE
//----------------------------------------------------------------------------------
// like une sauce
exports.likeSauce = (req, res, next) => {
   Sauce.findOne({ _id: req.params.id })
    //retourne une promesse avec reponse status 200 OK et l'élément en json
    .then((sauce) => {
      // définition de diverse variables
      let valeurVote;
      let votant = req.body.userId;
      let like = sauce.usersLiked;
      let unlike = sauce.usersDisliked;
      // determine si l'utilisateur est dans un tableau
      let bon = like.includes(votant);
      let mauvais = unlike.includes(votant);
      // ce comparateur va attribuer une valeur de point en fonction du tableau dans lequel il est
      if (bon === true) {
        valeurVote = 1;
      } else if (mauvais === true) {
        valeurVote = -1;
      } else {
        valeurVote = 0;
      }
      // ce comparateur va determiner le vote de l'utilisateur par rapport à une action de vote
      // si l'user n'a pas voté avant et vote positivement
      if (valeurVote === 0 && req.body.like === 1) {
        // ajoute 1 vote positif à likes
        sauce.likes += 1;
        // le tableau usersLiked contiendra l'id de l'user
        sauce.usersLiked.push(votant);
        // si l'user a voté positivement et veut annuler son vote
      } else if (valeurVote === 1 && req.body.like === 0) {
        // enlève 1 vote positif
        sauce.likes -= 1;
        // filtre/enlève l'id du votant du tableau usersLiked
        const nouveauUsersLiked = like.filter((f) => f != votant);
        // on actualise le tableau
        sauce.usersLiked = nouveauUsersLiked;
        // si l'user a voté négativement et veut annuler son vote
      } else if (valeurVote === -1 && req.body.like === 0) {
        // enlève un vote négatif
        sauce.dislikes -= 1;
        // filtre/enlève l'id du votant du tableau usersDisliked
        const nouveauUsersDisliked = unlike.filter((f) => f != votant);
        // on actualise le tableau
        sauce.usersDisliked = nouveauUsersDisliked;
        // si l'user n'a pas voté avant et vote négativement
      } else if (valeurVote === 0 && req.body.like === -1) {
        // ajoute 1 vote positif à unlikes
        sauce.dislikes += 1;
        // le tableau usersDisliked contiendra l'id de l'user
        sauce.usersDisliked.push(votant);
        // pour tout autre vote, il ne vient pas de l'index/front donc probabilité de tentative de vote illégal
      } else {
        console.log("tentavive de vote illégal");
      }
      // met à jour la sauce
      Sauce.updateOne(
        { _id: req.params.id },
        {
          likes: sauce.likes,
          dislikes: sauce.dislikes,
          usersLiked: sauce.usersLiked,
          usersDisliked: sauce.usersDisliked,
        }
      )
        // retourne une promesse avec status 201 Created et message en json
        .then(() => res.status(201).json({ message: "Vous venez de voter" }))
        // en cas d'erreur un status 400 et l'erreur en json
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    })
    // si erreur envoit un status 404 Not Found et l'erreur en json
    .catch((error) => res.status(404).json({ error }));
};