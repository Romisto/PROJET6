// on appelle password validator https://www.npmjs.com/package/password-validator
var passwordValidator = require('password-validator');
//créer un schema
var passwordSchema = new passwordValidator();
// Ajout des proprietés pour le mot de passe
passwordSchema
.is().min(8)                                   
.is().max(20)                                  
.has().uppercase(1)                           
.has().lowercase()                              
.has().symbols(1)
.has().digits(1) 
.is().not(/[\]()[{}<>@]/)                              
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123']); // Mettre ces valeurs sur liste noire

module.exports = passwordSchema;