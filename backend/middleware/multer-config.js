// on importe multer
const multer = require("multer");
// on définit les images/formats reçu en appartenance de format ( comme un dictionnaire)
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/bmp": "bmp",
  "image/gif": "gif",
  "image/x-icon": "ico",
  "image/svg+xml": "svg",
  "image/tiff": "tif",
  "image/tif": "tif",
  "image/webp": "webp",
};
// multer.diskStorage va enregistrer sur le disque
const storage = multer.diskStorage({
  // Définition de la destination des fichiers images
  destination: (req, file, callback) => {
      callback(null, 'images');
  },
  // Création du nom du fichier de l'image
  filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_').split('.')[0];
      const extension = MIME_TYPES[file.mimetype];
      callback(null, name + Date.now() + '.' + extension);
  }
});

// on exporte le fichier via multer qui possede l'objet storage puis .single signifie fichier unique (pas un groupe de fichiers) en disant que c'est un fichier 'image'
// ce nom de fichier sera la clé dans form-data de postman (insert File)
module.exports = multer({ storage:storage }).single("image");
